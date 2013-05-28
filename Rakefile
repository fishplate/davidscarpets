require 'bundler/setup'
Bundler.require(:default)
require 'active_support/core_ext'
require './config/config' if File.exists?('config/config.rb')
require './config/config_main'

#AWS Assets
namespace :aws do
  desc "Precompile assets"
  task :precompile do
    AssetSync.sync
  end
end