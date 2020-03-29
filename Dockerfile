FROM korosuke613/ubuntu-texlive-ja:latest

LABEL MAINTAINER=azu

RUN apt-get update && apt-get install -y \
    git \
    cpanminus \
    texlive-extra-utils \
    make \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN cpanm Log::Log4perl Log::Dispatch::File YAML::Tiny File::HomeDir Unicode::GCString