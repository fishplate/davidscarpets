helpers do
  def aws_asset( path )
   File.join settings.asset_host, path
  end
end