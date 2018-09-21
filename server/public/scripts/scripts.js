//Backbone Model is a model or class object
let Track = Backbone.Model.extend({
    defaults: {
        image: '',
        name:'',
        description:'',
        by:''
    },
});

//Backbone Collection is a an [] of Models
let Playlists = Backbone.Collection.extend({});


let tracks = new Playlists([
    {
             id: '2B34822B-0A27-4398-AE19-23A3C83F1220',
          image: '2B34822B-0A27-4398-AE19-23A3C83F1220_100.png',
           name: 'Sine',
    description: 'coolness',
             by: 'Sisyphus Industries',
        
    },
    {
             id: '',
          image: '_default_100.png',
           name: 'Free',
    description: 'a bunch of lines all over the place.',
             by: 'Sisyphus Industries',
    },
    {


             id: 'e0a61484-35eb-4f40-9a0a-7f9d6ee58c37',
          image: 'e0a61484-35eb-4f40-9a0a-7f9d6ee58c37_100.png',
           name: 'tensig2$',
    description: 'cooler',
             by: 'Sisyphus Industries',

    },
    
]);
//created a collection
// let playlists = new Playlists([track1, track2, track3]); 

//Backbone View for 1 track
let TrackView = Backbone.View.extend({
    model: new Track(),
    tagName: 'tr',
    initialize: function() {
        this.template = _.template($('.track_template').html());
    },
    events: {
          'click .edit_track': 'edit',
        'click .delete_track': 'delete',
        'click .update_track': 'update',
              'click .cancel': 'cancel',
        

    },
    edit: function(){
         $('.edit_track').hide();
         $('.delete_track').hide();
         $('.update_track').show();
         $('.cancel').show();

         let image       = $('.image').html();
         let name        = $('.name').html();
         let description = $('.description').html();
         let by          = $('.by').html();

         this.$('.image').html('<input type="file" accept="image/*" class="form-control image_update" value="' + image + '">');
         this.$('.name').html('<input type="text" class="form-control name_update" value="' + name + '">');
         this.$('.description').html('<input type="text" class="form-control description_update" value="' + description + '">');
         this.$('.by').html('<input type="text" class="form-control by_update" value="' + by + '">');
     

    },
    cancel: function() {
        playlistView.render();
    },
    update: function(){
        this.model.set({
              'image':  this.$('.image_update').val(),
               'name':  this.$('.name_update').val(),
        'description':  this.$('.description_update').val(),
                 'by':  this.$('.by_update').val()
        });
    },
    delete: function(){
        this.model.destroy();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
});
 // Backbone View for a Playlist of Tracks
let PlaylistView = Backbone.View.extend({
    model: tracks,
    el: $('.playList'),
    initialize: function() {
        let self = this;
        this.model.on('add', this.render, this);
        this.model.on('change',this.render, this);
        this.model.on('remove', this.render, this);
    },
    render: function() {
        let self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(track) {
          self.$el.append((new TrackView({ model: track })).render().$el);
        });
        return this;
    }
});

let playlistView  = new PlaylistView();

$(document).ready(function() {
    $('.add_track').on('click', function() {
        let track = new Track({
                  image: $('.image_input').val(),
                   name: $('.name_input').val(),
            description: $('.description_input').val(),
                     by: $('.by_input').val()
        });
                         $('.image_input').val('');
                         $('.name_input').val('');
                         $('.description_input').val('');
                         $('.by_input').val('');
        console.log(track.toJSON());
                         tracks.add(track);
    })
});