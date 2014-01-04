'use strict'

require! {
  fs
  glob
  util
  events
  events.EventEmitter
  meta: \./meta
  markdown: \./markdown
}

Generator = module.exports = ->
  EventEmitter.call @

util.inherits Generator, EventEmitter

Generator.create = ->
  new Generator

Generator.prototype.generate = (pattern, data || {}) ->
  process = @~process
  getFileStream = @~getFileStream
  globCb = (err, files) ->
    files.forEach (file) ->
      fileData = {
        file: file
      }
      fileData.__proto__ = data
      fileStream = getFileStream file
      fileStream.data = fileData
      process fileStream

  glob pattern, @~globCb
  @

Generator.prototype.process = (fileStream) ->
  fileStream
    .pipe meta!
    .pipe markdown!
  @emit \stream, fileStream
  @

Generator.prototype.getFileStream = (file) ->
  fs.createReadStream file
