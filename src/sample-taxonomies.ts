const MUSIC_TAXONOMY_JSON = {
    'children': [{'content': 'Rock', 'id': 1, 'label': 'Taxon',
                  'children': [{'content': 'Metal', 'id': 3, 'label': 'Taxon'}]},
                 {'content': 'Classical', 'id': 2, 'label': 'Taxon',
                  'children': [{'content': 'Baroque', 'id': 4, 'label': 'Taxon'}]}],
    'content': 'Music',
    'id': 0,
    'label': 'Taxon'
};

const OCCUPATION_TAXONOMY_JSON = {
    'children': [{'content': 'Manufacturing', 'id': 1, 'label': 'Taxon',
                  'children': [
                      {'content': 'Wood workers',
                       'id': 2, 
                       'label': 'Taxon', 
                       'children': [
                           {'content': 'Bandbox-maker',
                            'id': 3,
                            'label': 'Taxon'}
                       ]}
                  ]}],

    'content': 'Occupation',
    'id': 0,
    'label': 'Taxon'
};

const PLACE_TAXONOMY_JSON = {
    'children': [{'content': 'Country', 'id': 1, 'label': 'Taxon',
                  'children': [
                      {'content': 'France',
                       'id': 2, 
                       'label': 'Taxon'}]
                 }],
    'content': 'Place',
    'id': 0,
    'label': 'Taxon'
};
