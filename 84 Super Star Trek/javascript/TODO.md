# to do / maybe do

* positive state of repair in damaged systems - a feature? a bug?

* save / load / dump game state, if only for debugging help to repro issue

* convert to zero-based array indexes

* ANSI colors!

* offer a few game themes - maybe ST:TNG, BSG, B5?

* cheat codes? for debugging?

## Porting notes

* Lots of dedicated global variables used as subroutine parameters

* Need to convert from 1-based to 0-based array indexes

* No if/else just if then goto

* replaced lots of `on x goto` with arrays indexed on x
