# middlewares.py

from scrapy import signals
from scrapy.http import HtmlResponse
from scrapy.exceptions import IgnoreRequest
from itemadapter import is_item, ItemAdapter
import random


class FappeningSpiderMiddleware:
    """
    This middleware handles operations on the responses before they are passed
    to the spider and after the spider has processed them.
    """

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_spider_input(self, response, spider):
        """
        Called for each response that goes through the spider middleware
        and into the spider.

        Should return None or raise an exception.
        """
        spider.logger.info(f"Processing response from: {response.url}")
        return None

    def process_spider_output(self, response, result, spider):
        """
        Called with the results returned from the Spider, after
        it has processed the response.

        Must return an iterable of Request or item objects.
        """
        for i in result:
            if is_item(i):
                spider.logger.debug(f"Item scraped: {ItemAdapter(i).asdict()}")
            yield i

    def process_spider_exception(self, response, exception, spider):
        """
        Called when a spider or process_spider_input() method
        raises an exception.

        Should return either None or an iterable of Request or item objects.
        """
        spider.logger.error(f"Exception occurred: {exception} at {response.url}")
        return None

    def process_start_requests(self, start_requests, spider):
        """
        Called with the start requests of the spider.
        
        Must return only requests (not items).
        """
        for r in start_requests:
            spider.logger.info(f"Starting request: {r.url}")
            yield r

    def spider_opened(self, spider):
        spider.logger.info(f"Spider opened: {spider.name}")


class FappeningDownloaderMiddleware:
    """
    This middleware handles operations on requests and responses during
    the downloading process, including retries, CAPTCHAs, and content validation.
    """

    # List of User-Agents for rotation
    USER_AGENTS = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
    ]

    RETRY_HTTP_CODES = [500, 502, 503, 504]
    MAX_RETRIES = 3

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_request(self, request, spider):
        """
        Called for each request that goes through the downloader middleware.
        - Rotate User-Agent
        - Apply proxy (if configured)
        """
        user_agent = random.choice(self.USER_AGENTS)
        request.headers['User-Agent'] = user_agent
        spider.logger.debug(f"Using User-Agent: {user_agent} for {request.url}")
        return None

    def process_response(self, request, response, spider):
        """
        Called with the response returned from the downloader.
        - Retry on specific HTTP codes
        - Handle CAPTCHAs
        - Validate content type
        """
        if response.status in self.RETRY_HTTP_CODES:
            retries = request.meta.get('retry_times', 0) + 1
            if retries <= self.MAX_RETRIES:
                spider.logger.warning(f"Retrying {request.url} ({retries}/{self.MAX_RETRIES}) due to status {response.status}")
                retry_req = request.copy()
                retry_req.meta['retry_times'] = retries
                return retry_req
            else:
                spider.logger.error(f"Max retries reached for {request.url}")
                raise IgnoreRequest(f"Failed to fetch {request.url} after {self.MAX_RETRIES} retries")

        if self.is_captcha(response):
            spider.logger.warning(f"CAPTCHA detected on {response.url}. Consider implementing CAPTCHA solving or notify the user.")
            raise IgnoreRequest(f"CAPTCHA encountered at {response.url}")

        if not self.is_valid_content_type(response):
            spider.logger.error(f"Unexpected content type for {request.url}. Expected HTML, got {response.headers.get('Content-Type')}")
            raise IgnoreRequest(f"Invalid content type at {response.url}")

        return response

    def process_exception(self, request, exception, spider):
        """
        Called when a download handler or a process_request() method raises an exception.
        """
        spider.logger.error(f"Exception during request: {exception} for {request.url}")
        return None

    def spider_opened(self, spider):
        spider.logger.info(f"Spider opened: {spider.name}")

    def is_captcha(self, response):
        """
        Detect if the response contains a CAPTCHA.
        This function should be adapted to the specific CAPTCHA implementation.
        """
        # Example: Check for common CAPTCHA indicators in the page content
        return "captcha" in response.text.lower()

    def is_valid_content_type(self, response):
        """
        Validate that the response content type is HTML.
        """
        content_type = response.headers.get('Content-Type', b'').decode('utf-8')
        return 'text/html' in content_type
