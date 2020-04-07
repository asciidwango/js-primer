\ProvidesClass{asciibook}[2015/01/30]
\LoadClassWithOptions{jsbook}
%
% 印刷位置の調整
\advance\hoffset -0.0in
\advance\voffset -0.0in
%
% 1行の文字数および版面の左右空き調整
\setlength\paperheight {234truemm}
\setlength\paperwidth{182truemm}
\setlength{\textwidth}{46zw}
\setlength{\evensidemargin}{-3.4truemm}
\setlength{\oddsidemargin}{2.5truemm}
\setlength{\marginparsep}{3truemm}
\setlength{\marginparwidth}{6truemm}
%
% 1ページの行数を設定
\setlength{\textheight}{40\baselineskip}
%
% 本文中のヘッダ、フッタ
\def\ps@asciiheadings{%
   \def\@oddfoot{\hfil \thepage}% 奇数ページ
   \def\@evenfoot{\thepage \hfil}% 偶数ページ
   \def\@oddhead{\small \hfil \rightmark}% 奇数ページ
   \def\@evenhead{\small \leftmark \hfil}% 偶数ページ
}
%
% 前付けのヘッダ、フッタ
\def\ps@frontheadings{%
   \def\@oddfoot{\hfil \thepage}% 奇数ページ
   \def\@evenfoot{\thepage \hfil}% 偶数ページ
   \def\@oddhead{}% 奇数ページ
   \def\@evenhead{}% 偶数ページ
}
%
% 前付けのヘッダ、フッタ（同じ左右ヘッダを出す）
\def\ps@sameheadings{%
   \def\@oddfoot{\hfil \thepage}% 奇数ページ
   \def\@evenfoot{\thepage \hfil}% 偶数ページ
   \def\@oddhead{\small \hfil \leftmark}% 奇数ページ
   \def\@evenhead{\small \leftmark \hfil}% 偶数ページ
}
%
% 章トビラのヘッダ、フッタの指定
\makeatletter
\renewcommand{\chapter}{%
  \if@openright\cleardoublepage\else\clearpage\fi
  \global\@topnum\z@
  \secdef\@chapter\@schapter}
\makeatother
%
% ヘッダの空き調整
\addtolength{\topmargin}{-55pt}
\addtolength{\headsep}{10pt}
%
% フッタの空き調整
\setlength\footskip{2.5\baselineskip}
\addtolength{\textheight}{\baselineskip}
%
% 見出しフォントを太ゴシックにする
%\renewcommand{\headfont}{\sffamily\bfseries}
% 見出しフォントを新ゴDBにする
\renewcommand{\headfont}{\sffamily\bfseries\ebseries}
%
% 部の数字をアラビア数字に変更
% 背景にグラフィックを加える
\makeatletter
\renewcommand{\thepart}{\@arabic\c@part}

\renewcommand\part{%
  \if@openleft
    \cleardoublepage
  \else\if@openright
    \cleardoublepage
  \else
    \clearpage
  \fi\fi
  \thispagestyle{empty}% 欧文用標準スタイルでは plain
  \if@twocolumn
    \onecolumn
    \@restonecoltrue
  \else
    \@restonecolfalse
  \fi
  \null\vfil
  \secdef\@part\@spart}
\def\@part[#1]#2{%
  \ifnum \c@secnumdepth >-2\relax
    \refstepcounter{part}%
    \addcontentsline{toc}{part}{%
      \prepartname\thepart\postpartname\hspace{1zw}#1}%
  \else
    \addcontentsline{toc}{part}{#1}%
  \fi
  \markboth{}{}%
  {\centering
      \vbox to 0mm{\vskip 20.0mm
      \hbox to 0mm{\hskip 0.0mm
      \includegraphics[height=90.0mm]{part\thepart.eps}
      \hss
      }
    \vss
    }
    \vbox{
        \vskip 10mm
        {\Huge\headfont \prepartname\thepart\postpartname\hspace{1zw}#2\par}
        \vskip 0mm
        \hrulefill
        \vskip 20mm
    }
  }
  \@endpart}
\def\@spart#1{{%
    \centering
    \interlinepenalty \@M
    \normalfont
    \Huge \headfont #1\par}%
  \@endpart}
\def\@endpart{\vfil\newpage
  \if@twoside
   \if@openleft %% added (2017/02/24)
    \null\thispagestyle{empty}\newpage
   \else\if@openright %% added (2016/12/13)
    \null\thispagestyle{empty}\newpage
   \fi\fi %% added (2016/12/13, 2017/02/24)
  \fi
  \if@restonecol
    \twocolumn
  \fi}
\makeatother
%
% 章見出しの背景にグラフィックを入れる
\makeatletter
\def\@makechapterhead#1{
    \vbox to 0mm{\vskip 0.0mm
    \hbox to 160mm{\hskip 0.0mm
      \hfill
      \includegraphics[height=65.0mm]{chap\thechapter.eps}
      \hss
      }
    \vss
    }
    \vbox{
        \vskip 10mm
        \hskip 0mm{\LARGE\headfont \@chapapp\thechapter\@chappos}
        \vskip 5mm
        \hskip 0mm{\huge\headfont \parbox{130mm}{#1}}
        \vskip 4mm
        \hrulefill
        \vskip 20mm
    }
}
\makeatother

%
% 索引のスタイル
\def\ps@indexfoot{%
  \def\@oddfoot{%
        {\hbox to \fullwidth{\hfil \thepage}}}%
  \let\@oddhead\@empty
  \def\@evenfoot{%
        \hss {\hbox to \fullwidth{\thepage \hfil}}}%
  \let\@evenhead\@empty}
  
  \makeatletter
  \renewenvironment{theindex}{% 索引を2段組で出力する環境
    \if@twocolumn
      \onecolumn\@restonecolfalse
    \else
      \clearpage\@restonecoltrue
    \fi
    \columnseprule.4pt \columnsep 2zw
    \ifx\multicols\@undefined
      \twocolumn[\@makeschapterhead{\indexname}%
      \addcontentsline{toc}{chapter}{\indexname}]%
    \else
      \ifdim\textwidth<\fullwidth
        \setlength{\evensidemargin}{\oddsidemargin}
%        \setlength{\textwidth}{\fullwidth} コメントアウトした
%        \setlength{\linewidth}{\fullwidth}
        \begin{multicols}{2}[\chapter*{\indexname}% 3->2に変更した
        \addcontentsline{toc}{chapter}{\indexname}]%
      \else
        \begin{multicols}{2}[\chapter*{\indexname}%
        \addcontentsline{toc}{chapter}{\indexname}]%
      \fi
    \fi
    \@mkboth{\indexname}{}%
    \plainifnotempty % \thispagestyle{plain}
    \parindent\z@
    \parskip\z@ \@plus .3\jsc@mpt\relax
    \let\item\@idxitem
    \raggedright
    \footnotesize\narrowbaselines
  }{
    \ifx\multicols\@undefined
      \if@restonecol\onecolumn\fi
    \else
      \end{multicols}
    \fi
    \clearpage
  }
\makeatother
