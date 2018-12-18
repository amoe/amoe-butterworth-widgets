<template>
  <div class="home">
    <div class="compound-widget">
      <div  v-for="(ts, depth) in taxonSelectors" class="taxon-selector" :key="depth">
        <select v-on:change="onChange($event, depth)">
          <option value="" selected disabled hidden>Choose here</option>
          <option v-for="node in filterTaxons(depth)"
                  :value="node.id"
                  :key="node.id">{{node.content}}</option>
        </select>

        <div v-if="depth < highestLevel && selected[depth]"
             class="create-next-level-ts-button" v-on:click="addNewTaxonSelector"/>
      </div>
    </div>
    
    Highest level available is {{highestLevel}}
    Path is {{selected}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TreeModel from 'tree-model';
import {MyNodeModel, MyNode} from '@/types';
import util2 from '@/util2';
import * as log from 'loglevel';


// For this demo, there's just one compound widget, and that can be modified

const TAXONOMY_DATA = {
    'children': [{'content': 'Rock', 'id': 1, 'label': 'Taxon',
                  'children': [{'content': 'Metal', 'id': 3, 'label': 'Taxon'}]},
                 {'content': 'Classical', 'id': 2, 'label': 'Taxon',
                  'children': [{'content': 'Baroque', 'id': 4, 'label': 'Taxon'}]}],
    'content': 'Music',
    'id': 0,
    'label': 'Taxon'
};


interface LevelIndex {
    [key: string]: MyNodeModel[];
};

interface TaxonSelectorSpec {
};

interface ComponentData {
    selected: number[];
    taxonSelectors: TaxonSelectorSpec[];
};


const config = {};
const treeModel = new TreeModel(config)
const root = treeModel.parse<MyNodeModel>(TAXONOMY_DATA);

export default Vue.extend({
    name: 'home',
    components: {},
    data(): ComponentData {
        return {
            selected: [],
            taxonSelectors: []
        };
    },
    created() {
        this.addNewTaxonSelector();
    },
    mounted() {
        log.debug("Foo is %o", root);
    },
    methods: {
        onChange(e: Event, depth: number) {
            if (e.currentTarget === null) throw new Error("bad");
            const target: EventTarget = e.currentTarget;

            const casted = target as HTMLSelectElement;
            log.debug("target value is %o", casted.value);
            log.debug("depth is %o", depth);

            // Splice is crucial here!
            this.selected.splice(depth, 1, parseInt(casted.value));
            log.debug("selected is now %o", JSON.stringify(this.selected));
        },
        addNewTaxonSelector() {
            const newTaxonSelector: TaxonSelectorSpec = {};
            this.taxonSelectors.push(newTaxonSelector);
        },
        getPath(): number[] {
            return this.selected;
        },
        filterTaxons(depth: number) {
            log.debug("filtertaxons called for depth: %o", depth);
            log.debug("Path is: %o", JSON.stringify(this.getPath()));
            return util2.findValidChildren(root, this.getPath());
        }
    },
    computed: {
        taxonomyLevelIndex(): LevelIndex {
            const i = 0;
            const result: LevelIndex = {};

            root.walk(function (node): boolean {
                const level = node.getPath().length - 1;

                if (!(level in result)) {
                    result[level] = [];
                }

                result[level].push(node.model);
                return true;
            });

            log.debug("generated index: %o", result);

            return result;
        },
        highestLevel(): number {
            const availableLevels = Object.keys(this.taxonomyLevelIndex);
            availableLevels.sort();
            availableLevels.reverse();
            return parseInt(availableLevels[0]);
        }
    }
});
</script>

<style lang="less">
.compound-widget {
    border: 1px solid black;
    padding: 1em;

    display: flex;
    flex-direction: row;
}

.compound-widget > * {
    margin: 10px;
}

.taxon-selector {
    border: 1px solid red;
    height: 200px;
    width: 100px;
}

.create-next-level-ts-button {
    width: 32px;
    height: 32px;
    background-color: green;
}
</style>
