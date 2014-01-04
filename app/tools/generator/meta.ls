'use strict'

require! {
  stream
  yaml: \js-yaml
}

module.exports = (options || {}) ->
  buffer = ''
  contentIdentifier = options.identifier || '---'
  metaEnd = false
  trans = new stream.Transform

  emitMeta = !->
    if buffer
      try
        meta = yaml.safeLoad buffer
        trans.emit \meta, meta
      catch
        trans.emit \error, e
        trans.emit \meta, {}
    else
      trans.emit \meta, {}

  trans._transform = (chunk, enc, cb) !->
    thisData = []
    contentData = []
    if metaEnd
      chunk.split '\n' .forEach (str) ->
        if metaEnd
          contentData.push str
        else if str.trim! == contentIdentifier
          metaEnd = true
          emitMeta!
        else
          thisData.push str
      buffer += thisData.join '\n'
      contentData = contentData.join '\n'
      if contentData
        @push contentData
    else
      @push chunk
    cb!

  trans._flush = (cb) !->
    @emit \meta {}
    @push buffer
    buffer = null
    cb!

  trans
