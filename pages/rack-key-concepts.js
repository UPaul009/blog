import React from 'react';
import markdown from 'markdown-in-js';
import ruby from 'highlight.js/lib/languages/ruby';
import withOptions from '../components/layouts/withOptions';
import components from '../components';
import { Code } from '../components/Code';

export default withOptions({
  id: 'rack-key-concepts',
})(markdown(components)`
  The most important thing to know about Rack and the internet is knowing how the internet works. First you have HEAD, GET, POST, PUT, DELETE, TRACE, OPTIONS, CONNECT, and PATCH requests. 🤔 huh? Let’s run through them.

  A GET request will get a resource. A HEAD requests is a GET request without the body of a GET request. A POST request will submit data. A PUT will upload data. A DELETE will, well, delete a resource. A TRACE request will return the recieved request. OPTIONS will return the HTTP methods that your server supports. CONNECT converts the request to a TCP/IP tunnel, ususally used for SSL. A PATCH request will update do a partial modifications to an already existing resource.

  You can see what type of requests a website is using by looking in the network tab in Dev Tools.

  Now onto Rack itself. Rack is a Ruby gem that provides a minimal interface that goes between a server that supports Ruby and Ruby Frameworks.

  To use Rack you must first make a call to a class #call. All this needs to do is return a response that contains status codes, headers, and the body. That can be done with a Rack::Response object:

  ${(
    <Code syntax={ruby} language="ruby">{`
# call.rb

class Application
  def call(env)
    resp = Rack::Response.new
    resp.write "Hello, World"
    resp.finish
  end
end
    `}</Code>
  )}

  That will run whenever a request is received but you still need to set up a HTTP serve to receive that request. Using config.ru

  ${(
    <Code syntax={ruby} language="ruby">{`
# config.ru

require_relative "./application.rb"
run Application.new
    `}</Code>
  )}

  Now running rackup config.ru will start up your application.
`);
