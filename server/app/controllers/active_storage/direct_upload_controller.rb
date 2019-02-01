class ActiveStorage::DirectUploadsController < ApplicationController
  puts "******* loaded monkey patch controller"
  skip_before_action :verify_authenticity_token
end
