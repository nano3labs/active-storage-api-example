class Api::V1::FilesController < ActiveStorage::DirectUploadsController
  skip_forgery_protection
end
