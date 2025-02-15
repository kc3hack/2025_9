FROM ruby:3.3.5

ENV APP_HOME /app
WORKDIR $APP_HOME

RUN apt-get update -qq && apt-get install -y \
    build-essential \
    nodejs \
    yarn \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

RUN gem install bundler -N

COPY Gemfile Gemfile.lock ./
RUN bundle config set --local force_ruby_platform true && bundle install

COPY . .

CMD ["bin/rails", "server", "-b", "0.0.0.0"]

