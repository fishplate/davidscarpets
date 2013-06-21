require 'bundler/setup'
Bundler.require(:default)
require 'sinatra/static_assets'
require 'active_support/core_ext'
require 'rubygems'
require 'sinatra'
require 'sinatra/jsonp'
require 'twitter'
require 'sinatra/cross_origin'
require 'pony'
require 'sinatra/flash'
require './config/config.rb' if File.exists?('./config/config.rb')
require './config/config_main'
require './helpers/aws_helper'
require './config/environments/development'
require './config/environments/production'


enable :sessions

 twitter_client = Twitter::Client.new(
    :consumer_key       => ENV["CONSUMER_KEY"],
    :consumer_secret    => ENV["CONSUMER_SECRET"],
    :oauth_token        => ENV["OAUTH_TOKEN"],
    :oauth_token_secret => ENV["OAUTH_SECRET"],
  )

  get '/feed' do
    jsonp twitter_client.user_timeline('Davids_Carpets', :count => 4).map(&:attrs)
  end



get '/' do
  erb :index
end

post '/' do
  
    from = params[:name]
    subject = "#{params[:name]} has contacted you from David's Carpets Website"

    body = "#{params[:email]} #{params[:tel]}"

  Pony.mail(
  :from => from,
  :to => ENV["EMAIL_ADDRESS"],
  :subject => subject,
  :body => body,
  :via => :smtp,
  :via_options => {
    :address              => 'smtp.gmail.com',
    :port                 => '587',
    :enable_starttls_auto => true,
    :user_name            => ENV["USER_NAME"],
    :password             => ENV["PASSWORD"],
    :authentication       => :plain, 
    :domain               => "localhost.localdomain" 
})
  flash[:notice] = "Thanks for your email. We will be in touch soon."
  redirect '/success' 

end

get('/success') do
     erb :index 
  end
