const test = require('tap').test
const proxyquire = require('proxyquire')

const releaseNoteGenerator = proxyquire('../../lib', {
  'conventional-changelog': (options, cb) => {
    cb(null, options)
  }
})

test('get release notes', (t) => {
  t.test('pass well formed options on to conventional-changelog', (tt) => {
    tt.plan(4)

    releaseNoteGenerator({}, {
      pkg: {
        version: '1.2.3',
        repository: {
          url: 'git+https://github.com/semantic-release/release-notes-generator.git'
        }
      }
    }, (err, options) => {
      tt.error(err)
      tt.is(options.version, '1.2.3')
      tt.is(options.repository, 'https://github.com/semantic-release/release-notes-generator')
      tt.is(options.file, false)
    })
  })

  t.end()
})
