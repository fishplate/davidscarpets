AssetSync.configure do |con|
 con.fog_provider = ENV['FOG_PROVIDER']
 con.fog_region = ENV['FOG_REGION']
 con.fog_directory = ENV['FOG_DIRECTORY']
 con.aws_access_key_id = ENV['AWS_ACCESS_KEY_ID']
 con.aws_secret_access_key = ENV['AWS_SECRET_ACCESS_KEY']
 con.prefix = "assets"
 con.public_path = Pathname("./public")
 con.fail_silently = true
end