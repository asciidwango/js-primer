FROM korosuke613/ubuntu-texlive-ja:latest

LABEL MAINTAINER=azu

RUN apt-get update && apt-get install -y \
    git \
    cpanminus \
    texlive-extra-utils \
    texlive-lang-cyrillic \
    make \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY jlisting.sty /usr/share/texlive/texmf-dist/tex/latex/listings/
COPY harmony.sty /usr/share/texlive/texmf-dist/tex/latex/listings/
RUN mktexlsr
