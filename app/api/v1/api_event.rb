module V1
  class APIEvent < Grape::API
    # version 'v1', using: :path
    # format :json
    # prefix :api

    helpers do
      # def current_user
      #   @current_user ||= User.authorize!(env)
      # end

      # def authenticate!
      #   error!('401 Unauthorized', 401) unless current_user
      # end
    end

    desc 'Return a list public events.'
    get '/events' do
      Event.limit(20)
    end

    desc 'Return a public event.'
    params do
      requires :id, type: Integer, desc: 'Event ID.'
    end
    get "/events/:id" do
      event = Event.find_by(id: params[:id])
      present event
    end
    desc "Create new event."
    params do
      requires :name, type: String
      requires :desc, type: String
      requires :no, type: Integer
    end
    post "/events" do
      event = Event.new(declared(params, include_missing: false).except(:access_key))

      if event.save
        present event#, with: ApiV0::Entities::Post
      else
        raise StandardError, $!
      end
    end
    desc "Update event."
    params do
      requires :id, type: Integer#, desc: 'Event ID.'
      requires :name, type: String#, desc: "Event name"
      requires :desc, type: String#, desc: "Event desc"
      requires :no, type: Integer#, desc: "Event no"
    end
    patch "/events/:id" do
      event = Event.find_by(id: params[:id])

      if event.update(declared(params, include_missing: false).except(:access_key))
        present event#, with: ApiV0::Entities::Post
      else
        raise StandardError, $!
      end
    end
    desc "Delete a event."
    params do
      requires :id, type: String, desc: 'event ID.'
    end
    delete "/events/:id" do
      event = Event.find_by(id: params[:id])

      if event.destroy
        present event#, with: ApiV0::Entities::Post
      else
        raise StandardError, $!
      end
    end
  end
end