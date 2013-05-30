# This file is used by Rack-based servers to start the application.
require './david'
use Rack::Deflater
run Sinatra::Application
