'use strict'

require! {
  fs
  path
  jade
  mkdirp
  Generator: \./Generator
  config: \../../config.json
}

script = {}

script.main = !->
  console.log!
  @init !->
    console.log '  執行'
    console.log!

script.init = (cb) !->
  console.log '  初始化'

  @basedir =  path.join __dirname, \../..
  @generator = Generator.create!
  @enum = @getTypes!
  @types = @cleanTypes process.argv.slice 2

  if !@types.length
    @types = @enum.slice!

  @generator.on \stream, @~onStream
  @loadTemplates cb

script.getTypes = ->
  Object.keys config.generator || {}

script.cleanTypes = (types) ->
  newArr = []
  e = @enum
  types.forEach (type) !->
    if !!~indexOf type
      newArr.push type
  newArr

script.loadTemplates = (cb) !->
  len = @types.length
  templates = @templates = {}
  @types.forEach (type) !->
    file = config.generator[type].template
    if file
      fs.readFile file, (err, content) !->
        if !err
          templates[type] = content
        if !--len
          cb!
    else
      len--

script.mkdir = (cb) !->
  len = @types.length
  exit = @~exit
  @types.forEach (type) !->
    des = config.generator[type].destination
    if des
      mkdirp des, (err) !->
        if err
          exit err
        if !--len
          cb!
    else
      len--

script.generateAll = !->
  @types.forEach @~generate

script.generate = (type) !->
  pattern = path.join @basedir, config.generator[type].source
  @generator.generate pattern, {type: type}

script.onStream = (stream) !->
  console.log '    開始: {stream.data.file}'

  local = null
  template = @templates[stream.data.type] || ''
  type = config.generator[stream.data.type]

  source = type.source.split('*');
  filedir = path.dirname stream.data.file.replace source[0] || '', ''
  filename = path.basename stream.data.file, source.slice.pop() + \.html
  filepath = path.join @basedir, filedir, filename

  stream.on \meta, (meta) !->
    local = meta

  stream.on \readable, !->
    var data
    local.content = ''
    while data = @.read()
      local.content += data
    html = jade.render template, {article: local || {}}
    fs.writeFile filepath, html, (err) !->
      if err
        console.log '    失敗: {stream.data.file}. ({err.message})'
      else
        console.log '    成功: {filepath}'

script.exit = (err) !->
  if err
    console.log 'Error: {err.message}'
    process.exit 1
  else
    process.exit 0

script.main!
