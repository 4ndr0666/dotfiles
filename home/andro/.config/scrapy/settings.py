# Scrapy settings for fappening project

BOT_NAME = "fappening"

SPIDER_MODULES = ["fappening.spiders"]
NEWSPIDER_MODULE = "fappening.spiders"

# User-Agent: Identify your bot properly to avoid getting blocked
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36"

# Obey robots.txt rules
ROBOTSTXT_OBEY = True

# Enable logging for better debugging and monitoring
LOG_ENABLED = True
LOG_LEVEL = "INFO"  # Change to 'DEBUG' for more detailed output

# Configure maximum concurrent requests performed by Scrapy (default: 16)
CONCURRENT_REQUESTS = 16

# Configure a delay for requests for the same website (default: 0)
# This helps in not overwhelming the server and avoiding bans
DOWNLOAD_DELAY = 1  # 1 second delay between requests
CONCURRENT_REQUESTS_PER_DOMAIN = 8
CONCURRENT_REQUESTS_PER_IP = 8

# Disable cookies to reduce request overhead unless needed
COOKIES_ENABLED = False

# Disable Telnet Console (enabled by default)
TELNETCONSOLE_ENABLED = False

# Override the default request headers with more realistic values
DEFAULT_REQUEST_HEADERS = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en",
}

DOWNLOADER_MIDDLEWARES = {
    "fappening.middlewares.FappeningDownloaderMiddleware": 543,
    # Add other downloader middlewares if needed
}
SPIDER_MIDDLEWARES = {
    "fappening.middlewares.FappeningSpiderMiddleware": 543,
    # Add other spider middlewares if needed
}

ITEM_PIPELINES = {
    "fappening.pipelines.FappeningPipeline": 300,
    "fappening.pipelines.FappeningImagesPipeline": 1,
}

# Directory where the downloaded images will be stored
IMAGES_STORE = "images"

# Enable and configure the AutoThrottle extension to optimize crawling speed and prevent bans
AUTOTHROTTLE_ENABLED = True
AUTOTHROTTLE_START_DELAY = 1  # Initial download delay
AUTOTHROTTLE_MAX_DELAY = 10  # Maximum download delay in case of high latencies
AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0  # Target concurrency
AUTOTHROTTLE_DEBUG = False  # Set to True to see throttle stats in the logs

# Enable and configure HTTP caching to speed up crawling and reduce load on servers
HTTPCACHE_ENABLED = True
HTTPCACHE_EXPIRATION_SECS = 86400  # Cache expires in 24 hours
HTTPCACHE_DIR = "httpcache"
HTTPCACHE_IGNORE_HTTP_CODES = [500, 502, 503, 504, 400, 403, 404, 408]
HTTPCACHE_STORAGE = "scrapy.extensions.httpcache.FilesystemCacheStorage"

# Enable retries to handle temporary failures and avoid missing data
RETRY_ENABLED = True
RETRY_TIMES = 3  # Retry a failed request up to 3 times
RETRY_HTTP_CODES = [500, 502, 503, 504, 408]

# Enable request fingerprinting to avoid duplicate requests
DUPEFILTER_CLASS = "scrapy.dupefilters.RFPDupeFilter"

# Enable DNS in-memory cache for faster lookups
DNSCACHE_ENABLED = True

# Set settings whose default value is deprecated to a future-proof value
REQUEST_FINGERPRINTER_IMPLEMENTATION = "2.7"
TWISTED_REACTOR = "twisted.internet.asyncioreactor.AsyncioSelectorReactor"
FEED_EXPORT_ENCODING = "utf-8"
