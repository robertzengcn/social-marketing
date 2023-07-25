from Marketingtool.commandline import get_command_line
import os
import logging
from Marketingtool.config import get_config


logger = logging.getLogger(__name__)


class WrongConfigurationError(Exception):
    pass



def main(return_results=False, parse_cmd_line=True, config_from_dict=None,external_config_file_path=None):
    if parse_cmd_line:
        cmd_line_args = get_command_line()
        if cmd_line_args.get('config_file', None):
            external_config_file_path = os.path.abspath(
                cmd_line_args.get('config_file'))
            logger.info("external config file is {}".format(
                external_config_file_path))

    
    

