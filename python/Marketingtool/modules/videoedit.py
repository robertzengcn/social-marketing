from moviepy.editor import VideoFileClip, concatenate_videoclips
import os.path
class Videoedit():
    def __init__(self)-> None:
        pass 
    
    def insertVideo(self, origin, inVideo, outputpath):
        """
        insert an video into another video
        """
        if os.path.exists(origin)!=True:
            raise FileNotFoundError("origin video File not found")
        if os.path.exists(inVideo)!=True:
            raise FileNotFoundError("insert video File not found")
        splist=self.splitVideo(origin,2)
        clip1=splist[0].resize((1280, 720))
        clip2=splist[1].resize((1280, 720))
        clip3=VideoFileClip(inVideo).resize((1280, 720))
        final_clip = concatenate_videoclips([clip1,clip3,clip2])
        final_clip.write_videofile(outputpath)
        pass
    def splitVideo(self,videopath,parts:int)->list:
        
        clip = VideoFileClip(videopath)
        duration = clip.duration
        clip_list = []
        for i in range(parts):
            clip_list.append(clip.subclip(i*duration/parts,(i+1)*duration/parts))
        return clip_list