configure :development do 
 set :asset_host, "https://s3-eu-west-1.amazonaws.com/#{ENV['FOG_DIRECTORY']}" 
end