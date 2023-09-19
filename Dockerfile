FROM nikolaik/python-nodejs:python3.9-nodejs18
LABEL MAINTAINER="zengjianze@gmail.com"
RUN pip install Marketingtool==1.0.2
ARG USERNAME=pn
# ARG USER_UID=1000
# ARG USER_GID=$USER_UID
ENV APP=/app
RUN mkdir -p $APP

# Create the user
# RUN useradd -ms /bin/bash $USERNAME
RUN chown -R pn:pn $APP
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
RUN apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# RUN chown -R $USERNAME:$USERNAME $APP
USER $USERNAME
WORKDIR $APP
