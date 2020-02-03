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
