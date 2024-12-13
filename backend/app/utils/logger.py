import logging
import os
import colorlog
from logging.handlers import RotatingFileHandler

os.makedirs("app/utils", exist_ok=True)

# Create a colorized stream handler for terminal output
formatter = colorlog.ColoredFormatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    log_colors={
        'DEBUG': 'blue',
        'INFO': 'green',
        'WARNING': 'yellow',
        'ERROR': 'red',
        'CRITICAL': 'bold_red',
    }
)

# Setup logger
logger = logging.getLogger("conference_logger")
logger.setLevel(logging.DEBUG)

# Rotating file handler
file_handler = RotatingFileHandler("app/utils/conference.log", maxBytes=1000000, backupCount=3)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

# Stream handler (console output with color)
stream_handler = logging.StreamHandler()
stream_handler.setFormatter(formatter)
logger.addHandler(stream_handler)
