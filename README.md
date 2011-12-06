For reading user input from stdin.

Like `read(1)` for node.  (NB: very different from `read(2)`!)

    read [-ers] [-u fd] [-t timeout] [-a aname] [-p prompt]  [-n  nchars]  [-d  delim]
    [name ...]
       One line is read from the standard input, or from the  file  descriptor  fd
       supplied as an argument to the -u option, and the first word is assigned to
       the first name, the second word to the second name, and so on,  with  left-
       over  words and their intervening separators assigned to the last name.  If
       there are fewer words read from the input stream than names, the  remaining
       names  are  assigned empty values.  The characters in IFS are used to split
       the line into words.  The backslash character (\) may be used to remove any
       special  meaning  for  the  next  character read and for line continuation.
       Options, if supplied, have the following meanings:
       -a aname
              The words are assigned to sequential indices of the  array  variable
              aname,  starting  at  0.   aname  is unset before any new values are
              assigned.  Other name arguments are ignored.
       -d delim
              The first character of delim is used to terminate  the  input  line,
              rather than newline.
       -e     If the standard input is coming from a terminal, readline (see READ-
              LINE above) is used to obtain the line.
       -n nchars
              read returns after reading nchars characters rather than waiting for
              a complete line of input.
       -p prompt
              Display prompt on standard error, without a trailing newline, before
              attempting to read any input.  The prompt is displayed only if input
              is coming from a terminal.
       -r     Backslash  does  not  act  as an escape character.  The backslash is
              considered to be part of the line.  In particular, a  backslash-new-
              line pair may not be used as a line continuation.
       -s     Silent mode.  If input is coming from a terminal, characters are not
              echoed.
       -t timeout
              Cause read to time out and return failure  if  a  complete  line  of
              input is not read within timeout seconds.  This option has no effect
              if read is not reading input from the terminal or a pipe.
       -u fd  Read input from file descriptor fd.

       If no names are supplied, the line read is assigned to the variable  REPLY.
       The return code is zero, unless end-of-file is encountered, read times out,
       or an invalid file descriptor is supplied as the argument to -u.
