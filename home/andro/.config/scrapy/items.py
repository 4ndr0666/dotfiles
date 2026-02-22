# items.py

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class FappeningItem(scrapy.Item):
    """
    This class defines the structure of the items that will be scraped.
    Each field represents a piece of data you want to extract from the website.
    """

    # Define the fields for your item here:
    image_urls = scrapy.Field()  # List of image URLs
    images = scrapy.Field()  # Metadata about downloaded images (used by ImagesPipeline)
    image_name = scrapy.Field()  # Custom field for storing the image name or title
    page_url = scrapy.Field()  # The URL of the page from which the images were scraped
    timestamp = scrapy.Field()  # Optional: Capture the time when the item was scraped

    def __repr__(self):
        """
        Override the __repr__ method to provide a concise and useful representation
        of the item when it is printed or logged.
        """
        # Limit the length of the image URLs displayed in logs for readability
        image_urls_display = (
            ", ".join(self["image_urls"][:2]) + "..."
            if len(self["image_urls"]) > 2
            else ", ".join(self["image_urls"])
        )
        return f"FappeningItem(image_urls=[{image_urls_display}], image_name={self.get('image_name', 'N/A')})"
