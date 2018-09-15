//Backbone Model is a model or class object
let Track = Backbone.Model.extend({
    defaults: {
        trackNumber: '',
        name:'',
        description:'',
        by:''
    }
})

//Backbone Collection is a an [] of Models
let Playlists = Backbone.Collection.extend({

});

//instantiate 2 tracks

let track1 = new Track({
    trackNumber: '01',
    name:'Sine',
    description:'a bunch of lines all over the place.',
    by:'Sisyphus Industries',

});

let track2 = new Track({
    trackNumber: '02',
    name:'Erase',
    description:'clears the board for the nex design.',
    by:'Sisyphus Industries',

});
//created a collection
let playlists = new Playlists([track1, track2]); 


//Backbone View for 1 track
let TrackView = Backbone.View.extend({
    model: new Track(),
    tagName: 'tr',
    initialize: function() {
        this.template = _.template($('.track_template').html)
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()))
    }
});
 // Backbone View for a Playlist of Tracks
let PlaylistView = Backbone.View.extend({
    model: playlists,
    el: $('.playList'),
    initialize: function() {
        this.model.on('add', this.render(), this);
    },
    render: function() {
        let self = this;
        this.$el('');
        _.each(this.model.toArray(), function(track){
          self.$el.append((new TrackView({model: track})).render().$el);
        });
    }
});

$(document).ready(function() {
    $('.add_track').on('click',function() {
        let track = new Track({
            trackNumber: $('.track_input').val(),
            name: $('.name_input').val(),
            description: $('.description_input').val(),
            by: $('.by_input').val()
        });
        console.log(track.toJSON());
        
    })
})