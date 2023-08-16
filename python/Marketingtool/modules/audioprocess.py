# -*- coding: utf-8 -*-
import whisper
import os
from whisper.utils import get_writer
from Marketingtool.common import path_leaf

Transcrifiletype =dict[str,str]

class Audioprocess():
    def __init__(self):
        pass
    # transcribe speech
    def transcribeSpeech(self,videopath:str,outputpath:str,filetype:str="srt",modelval:str="base")->Transcrifiletype:
        if os.path.exists(videopath)!=True:
            raise FileNotFoundError("File not found")
        typelist = ["srt","vtt","json","txt"]
        if filetype not in typelist:
            raise ValueError("File type not supported")
        modellist=["tiny","base","small","medium","large"]
        if modelval not in modellist:
            raise ValueError("Model not supported")
        model = whisper.load_model(modelval)
        audio = whisper.load_audio(videopath)
        audio = whisper.pad_or_trim(audio)
        # # make log-Mel spectrogram and move to the same device as the model
        mel = whisper.log_mel_spectrogram(audio).to(model.device)

        # # detect the spoken language
        _, probs = model.detect_language(mel)
        print(f"Detected language: {max(probs, key=probs.get)}")
        videolang=max(probs, key=probs.get)
        # # decode the audio
        # options = whisper.DecodingOptions(fp16 = False)
        # result = whisper.decode(model, mel, options)
        # print(result)
        result = model.transcribe(videopath)
        txt_writer = get_writer(filetype, outputpath)
        txt_writer(result, videopath)
        
        res={"outpat":outputpath+path_leaf(videopath),
             "lang":videolang,
        }
        return res
    

    
    

    
    