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
  Redirection.create!(from_path: '/dashboard', to_path: '/')
  Redirection.create!(from_path: '/home-page', to_path: '/welcome')
  Redirection.create!(from_path: '/setup', to_path: '/settings')
  Redirection.create!(from_path: '/article/password', to_path: '/article/password-protection')
  puts 'Done! Now your database contain categories, articles, settings and redirections.'
end

def create_article!(options = {})
  article_attributes = { author: 'Oliver Smith',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur urna nisi, eleifend a ante id, iaculis egestas velit. Nulla nunc diam, eleifend eu ultricies ut, posuere id arcu. Duis a ligula et lorem convallis ullamcorper. Mauris quis lorem ornare, maximus mauris eget, vehicula nisi. Suspendisse dictum porta orci nec euismod. Pellentesque venenatis elit felis, quis aliquam nunc tristique ac. Phasellus gravida diam non elit suscipit, quis rhoncus leo tempus. Aenean erat sapien, accumsan porta odio et, finibus laoreet odio.Suspendisse eleifend eget orci sed tristique.

    Suspendisse a blandit lectus. Phasellus et volutpat mauris, nec placerat velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Proin egestas, mi quis auctor dapibus, est est tristique sapien, non euismod tortor purus quis neque. Nulla facilisi. Nunc a libero leo. Sed nibh tellus, elementum eget eleifend eu, eleifend iaculis lectus. Maecenas gravida vel dui sed porttitor. Mauris vel leo leo. Aenean convallis consequat tincidunt. Cras viverra quis orci ac tristique. Maecenas et magna id orci lacinia porta. Aliquam aliquam consequat lectus, eu dapibus sem consequat fringilla. Nullam auctor odio est, non blandit ante vestibulum vel. Donec vel metus vehicula, viverra felis ut, dictum dui.

    Morbi fermentum luctus nunc, non molestie ex porttitor quis. Aenean facilisis sollicitudin quam, eu vestibulum quam. Mauris bibendum convallis dapibus. Nam placerat sed enim sed faucibus. Donec fermentum mi sapien, ut sollicitudin nulla aliquet sit amet. Integer lacinia eget nibh et interdum. Donec ut nisi ut elit aliquet ornare eget id libero. Aliquam erat volutpat. Quisque bibendum mi maximus leo hendrerit, eget congue orci luctus. In augue neque, auctor non erat nec, ultricies dictum diam. Vivamus maximus pretium gravida. Fusce ac ullamcorper ex. Morbi non justo vestibulum eros eleifend scelerisque eget eu augue. Aliquam iaculis tortor in consequat laoreet.
    
    Vestibulum at nisi egestas, feugiat urna id, aliquet magna. Quisque vel tortor eu nulla dapibus elementum. Vivamus volutpat, massa vitae rutrum volutpat, velit ex dapibus purus, ut dictum lorem magna non dolor. Fusce varius ex elit, non tempor justo porta sit amet. Morbi sed orci fringilla, luctus enim ac, mollis dui. Aliquam condimentum quam nec ligula ullamcorper, nec varius ipsum sollicitudin. Vivamus facilisis, dui sed porttitor blandit, ligula enim auctor risus, sodales varius dolor orci vitae magna. Nunc rhoncus dignissim ante non laoreet.',
    }
  attributes = article_attributes.merge options
  Article.create! attributes
end
