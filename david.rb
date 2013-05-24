require 'bundler/setup'
require 'rubygems'
require 'sinatra'
require 'pony'
require 'sinatra/flash'
# require './config/config.rb' if File.exists?('./config/config.rb')


get '/' do
  erb :index
end

post '/' do
  
    from = params[:name]
    subject = "#{params[:name]} has contacted you from David's Carpets Website"

    body = "#{params[:email]}#{params[:tel]}"

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
