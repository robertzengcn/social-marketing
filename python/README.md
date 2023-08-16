#Marketing Tool
This package is a tool help you do some job like transcribe the speech in video, save your time
### How to use
Transcribe the speech in video
```
Marketingtool --action transcribe -f videofilepath
```

Insert Video into another video
```
 Marketingtool -a insertVideo -f ~/project/toyproject/social_market/tmp/video/2023-7-27/test.flv -o ~/tmp/result.mp4 --insert-video ~/tmp/video.mp4
```

Upload video to youtube
```
Marketingtool -a uploadyoutube -f /path/to/video --title "Summer vacation in California" --description="Had fun surfing in Santa Cruz" --category="22" --keywords="surfing" --privacyStatus="private" -v info
```

### How to develop
You can also install python package comfortably with pip:

```
virtualenv --python python3 markenv
source markenv/bin/activate
pip3 install -e .
```

#### Update depend python package for requirement.txt
```
pip3 freeze > requirements.txt
```