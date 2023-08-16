from Marketingtool.commandline import get_command_line
import os
import logging
from Marketingtool.config import get_config
from Marketingtool.modules.audioprocess import Audioprocess
from Marketingtool.modules.translator import Translator
from Marketingtool.modules.videoedit import Videoedit
from Marketingtool.modules.youtube import Youtube
from apiclient.errors import HttpError
from Marketingtool.log import setup_logger
from argparse import Namespace

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
    config = get_config(cmd_line_args, external_config_file_path, config_from_dict)    
    if isinstance(config['log_level'], int):
        config['log_level'] = logging.getLevelName(config['log_level'])

    setup_logger(level=config.get('log_level').upper(), format=config.get('log_format'), logfile=config.get('log_file'))
    action = config.get('action', None)
    
    if action == 'transcribe':
        audiofile = config.get('inputfile', None)
        if audiofile == None:
            raise WrongConfigurationError("audio file is not specified")
        outputfile = config.get('outputfile', None)
        if outputfile == None:
            raise WrongConfigurationError("output file is not specified")
        audioprocess = Audioprocess()
        print(audiofile)
        audioprocess.transcribeSpeech(audiofile,outputfile,"srt","small") 
    elif action == 'translate':
        srtfile = config.get('inputfile', None)
        if srtfile == None:
            raise WrongConfigurationError("srt file is not specified")
        sourcelang = config.get('sourcelang', None)
        if sourcelang == None:
            raise WrongConfigurationError("source language is not specified")
        targetlang = config.get('targetlang', None)        
        if targetlang == None:
            raise WrongConfigurationError("target language is not specified")
        translatorModel=Translator()
        translatorModel.subtitle_translator(srtfile,targetlang,sourcelang)
    elif action == 'insertVideo':
        originvideo = config.get('inputfile', None)
        if originvideo == None:
            raise WrongConfigurationError("origin video is not specified")
        advideo = config.get('insertvideo', None)
        if advideo == None:
            raise WrongConfigurationError("ad video is not specified")
        
        outputvideo = config.get('outputfile', None)
        if outputvideo == None:
            raise WrongConfigurationError("output video is not specified")
        videoeditModel=Videoedit()
        
        videoeditModel.insertVideo(originvideo,advideo,outputvideo)
    elif action=='uploadyoutube':
        videofile=config.get('inputfile', None)
        
        if(videofile==None):
            raise WrongConfigurationError("video file is not specified")
        if not os.path.exists(videofile):
            raise FileNotFoundError("video file not exists")
        title=config.get('title', None)
        if(title==None):
            raise WrongConfigurationError("title is not specified")
        description=config.get('description', None)
        if(description==None):
            raise WrongConfigurationError("description is not specified")
        category=config.get('category', None)
        if(category==None):
            raise WrongConfigurationError("category is not specified")  
        keywords=config.get('keywords', None)
        if(keywords==None):
            raise WrongConfigurationError("keywords is not specified")              
        privacystatus=config.get('privacystatus', None)
        if(privacystatus==None):
            raise WrongConfigurationError("privacystatus is not specified")         
        args=dict(file=videofile,title=title,description=description,category=category,
            keywords=keywords,privacyStatus=privacystatus,logging_level='INFO'
              )
        namespace = Namespace()
        for name in args:
            setattr(namespace, name, args[name])
        
        YoutubeModel=Youtube()
        # logger.info(97)
        clientfilepath='/home/robertzeng/project/toyproject/social_market/python/Marketingtool/modules/client_secrets.json'
        youtube = YoutubeModel.get_authenticated_service(clientfilepath)
        
        try:
            YoutubeModel.initialize_upload(youtube, namespace)
        except HttpError as e:
            print("An HTTP error %d occurred:\n%s" % (e.resp.status, e.content))
    else:
        raise WrongConfigurationError("action is not supported")

    
    

