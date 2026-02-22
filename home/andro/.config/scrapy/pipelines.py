# pipelines.py

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import os
from itemadapter import ItemAdapter
from scrapy.pipelines.images import ImagesPipeline
from scrapy.exceptions import DropItem
from scrapy import Request


class FappeningPipeline:
    """
    This pipeline performs data cleaning, validation, and image renaming
    for the scraped items before they are stored or further processed.
    """

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)

        # Data cleaning: Ensure all required fields are present
        if not adapter.get("image_urls") or not adapter.get("image_name"):
            raise DropItem(f"Missing required fields in {item}")

        # Example: Clean the image name (remove unwanted characters, etc.)
        adapter["image_name"] = self.clean_image_name(adapter["image_name"])

        # Example: Log the item for audit purposes
        spider.logger.info(f"Processed item: {adapter.asdict()}")

        return item

    def clean_image_name(self, name):
        """
        Clean the image name by removing unwanted characters and formatting it properly.
        """
        # Remove any unwanted characters, spaces, etc.
        return name.strip().replace(" ", "_").replace("/", "-")


class FappeningImagesPipeline(ImagesPipeline):
    """
    This pipeline handles downloading images, renaming them, and storing them
    in the desired location.
    """

    def get_media_requests(self, item, info):
        """
        Generates the requests to download the images.
        """
        adapter = ItemAdapter(item)
        for image_url in adapter["image_urls"]:
            yield Request(image_url, meta={"image_name": adapter.get("image_name")})

    def file_path(self, request, response=None, info=None, *, item=None):
        """
        Customize the file name and path for the downloaded images.
        """
        image_name = request.meta.get("image_name", "default_name")
        image_guid = os.path.basename(request.url)
        filename = f"{image_name}/{image_guid}"
        return filename

    def item_completed(self, results, item, info):
        """
        Called when an item has been completely processed by the pipeline.
        """
        if not all([x[0] for x in results]):
            raise DropItem(f"Failed to download images for {item}")
        return item
