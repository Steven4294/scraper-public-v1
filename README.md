scripts:

forever list
forever stop 0
forever stop 1
forever stop 2

forever start -v -c ts-node src/index.ts