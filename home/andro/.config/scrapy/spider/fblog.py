import scrapy
from scrapy.exceptions import CloseSpider


class FblogSpider(scrapy.Spider):
    name = "fblog"
    allowed_domains = ["thefappeningblog.com"]
    start_urls = [
        "https://thefappeningblog.com/wp-content/uploads/2021/12/Sarah-Silverman-Nude-Photo-Collection-Leak-1-thefappeningblog.com_.jpg"
    ]

    def parse(self, response):
        # Verify if the response status is 200 (OK)
        if response.status != 200:
            self.log(
                f"Failed to retrieve URL: {response.url} with status: {response.status}",
                level=scrapy.log.WARNING,
            )
            raise CloseSpider(f"Non-200 status code encountered: {response.status}")

        # Extract and yield the image URL
        image_url = response.url
        image_name = self.extract_image_name(image_url)

        yield {
            "image_urls": [
                image_url
            ],  # This key 'image_urls' is used by the ImagesPipeline
            "image_name": image_name,  # The extracted name of the image for storage and processing
            "page_url": response.url,  # Store the URL of the page where the image was found
        }

        # Generate the next image URL in sequence
        current_num = self.extract_image_number(image_url)
        next_num = current_num + 1  # Increment the sequence number

        next_image_url = image_url.replace(f"-{current_num}-", f"-{next_num}-")

        # Make a request to the next image URL
        yield scrapy.Request(
            next_image_url, callback=self.parse, errback=self.handle_error
        )

    def handle_error(self, failure):
        # Log errors if the request fails
        self.log(f"Request failed with error: {failure}", level=scrapy.log.ERROR)

    def extract_image_name(self, url):
        """
        Extracts a clean image name from the URL for use in storage.
        """
        # Example: Extract the base name and remove unwanted characters
        image_name = url.split("/")[-1].split("-")[0]  # Simplified extraction logic
        return image_name.strip().replace("_", " ").replace("-", " ").capitalize()

    def extract_image_number(self, url):
        """
        Extracts the sequence number from the image URL.
        """
        return int(url.split("-")[-2])  # Extract the current sequence number
