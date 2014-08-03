# Script by Chris Johnson
# http://chrisltd.com

$ ->
  console.log 'Hello World'

  
# make it safe to use console.log always
((b) ->
  c = ->
  d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(",")
  a = undefined

  while a = d.pop()
    b[a] = b[a] or c
  return
) (->
  try
    console.log()
    return window.console
  catch err
    return window.console = {}
  return
)()
