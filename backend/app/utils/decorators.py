from loguru import logger
import functools
import os

def log_function_call(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # Get the filename where the decorated function is defined
        filename = os.path.basename(func.__code__.co_filename)
        function_name = func.__name__

        # Log request
        logger.info(f"Request is at {filename} - Function: {function_name}")

        # Execute the function
        result = func(*args, **kwargs)

        # Log response
        logger.info(f"Response is at {filename} - Function: {function_name}")

        return result
    return wrapper


