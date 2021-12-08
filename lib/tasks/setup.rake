desc 'drops the db, creates db, migrates db and populates sample data'
task setup: [:environment, 'db:drop', 'db:create', 'db:migrate'] do
  Rake::Task['populate_with_sample_data'].invoke if Rails.env.development?
end

task populate_with_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data in production"
  else
    create_sample_data!
    puts "sample data has been added."
  end
end

def create_sample_data!
  puts 'Seeding with sample data...'
  category1 = Category.create!(name: 'Getting Started')
  category2 = Category.create!(name: 'Apps & Integration')
  category3 = Category.create!(name: 'Security & Privacy')
  category4 = Category.create!(name: 'Misc')
  create_article! title: 'Welcome to Scribble', status: 0, category_id: category1.id
  create_article! title: 'Setting up', status: 1, category_id: category4.id
  create_article! title: 'Writing an article', status: 1, category_id: category1.id
  create_article! title: 'Redirections', status: 1, category_id: category3.id
  create_article! title: '301 and 302 redirections', status: 1, category_id: category3.id
  create_article! title: 'Typography', status: 0, category_id: category4.id
  create_article! title: 'Password Protection', status: 1, category_id: category3.id
  create_article! title: 'Publishing an article', status: 0, category_id: category1.id
  create_article! title: 'Draft vs Published', status: 0, category_id: category4.id
  create_article! title: 'Unprotected Scribble', status: 1, category_id: category3.id
  create_article! title: 'Font weights', status: 1, category_id: category4.id
  create_article! title: 'Font sizes', status: 1, category_id: category4.id
  Setting.create!(site_name: 'Spinkart', password: 'welcome123', protection_status: 1)
  puts 'Done! Now your database contain different categories and its corresponding articles'
end

def create_article!(options = {})
  article_attributes = { author: 'Oliver Smith',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur urna nisi, eleifend a ante id, iaculis egestas velit. Nulla nunc diam, eleifend eu ultricies ut, posuere id arcu. Duis a ligula et lorem convallis ullamcorper. Mauris quis lorem ornare, maximus mauris eget, vehicula nisi. Suspendisse dictum porta orci nec euismod. Pellentesque venenatis elit felis, quis aliquam nunc tristique ac. Phasellus gravida diam non elit suscipit, quis rhoncus leo tempus. Aenean erat sapien, accumsan porta odio et, finibus laoreet odio. Suspendisse eleifend eget orci sed tristique.',
    }
  attributes = article_attributes.merge options
  Article.create! attributes
end
