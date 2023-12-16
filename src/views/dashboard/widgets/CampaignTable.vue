<template>
    <div class="search_bar mt-4 d-flex jsb">
        <div class="d-flex jsb search_tool">
            <div class="search_wrap mr-4">
                <v-text-field rounded class="elevation-0" density="compact" variant="solo" label="Search sample"
                    append-inner-icon="mdi-magnify" single-line hide-details></v-text-field>
            </div>
            <v-btn class="btn" variant="flat" prepend-icon="mdi-filter-variant" ><span> More</span></v-btn>
        </div>
        <div>
            <v-chip class="mx-2" closable color="pink"> Secondary </v-chip>
            <v-chip class="mx-2" closable color="secondary"> Label </v-chip>
            <v-chip class="mx-2"> Status </v-chip>
        </div>
    </div>
    <v-data-table-server v-model:items-per-page="itemsPerPage" :search="search" :headers="headers"
        :items-length="totalItems" :items="serverItems" :loading="loading" item-value="name" @update:options="loadItems">
    </v-data-table-server>
    <div class="d-flex py-2" style="justify-content: center">
        <v-pagination :model-value="1" :length="4" size="small" rounded="circle"></v-pagination>
    </div>
    <v-dialog width="30%">
        <v-card title="Dialog">
            <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" block>Close Dialog</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">

import { getCampaignlist } from '@/api/campaigins'
import { ref } from 'vue'
import {SearchResult} from '@/api/types'
// import type { VDataTable } from 'vuetify/lib/components/index.mjs'
type Fetchparam={
    page:number,
    itemsPerPage:number,
    sortBy:string,
    search:string
}

const FakeAPI = {
    async fetch(fetchparam:Fetchparam):Promise<SearchResult> {
        
        return await getCampaignlist({ page:fetchparam.page, size:fetchparam.itemsPerPage, sortby:fetchparam.sortBy, search:fetchparam.search })
    }
}
// export default {
    // data: () => ({
        const itemsPerPage= ref(5);
        const headers:Array<any>= [
            {
                title: 'Campaign Id',
                align: 'start',
                sortable: false,
                key: 'id',
            },
            {
                title: 'Campaign Name',
                align: 'start',
                sortable: false,
                key: 'name',
            },
            {
                title: 'Campaign Description',
                align: 'start',
                sortable: false,
                key: 'description',
            },
            {
                title: 'Campaign Status',
                align: 'start',
                sortable: false,
                key: 'status',
            },
            {
                title: 'Campaign Types',
                align: 'start',
                sortable: false,
                key: 'types',
            },

        ];
        const serverItems= ref([]);
        let loading= true;
        const totalItems= ref(0);
        const search='';
    // }),
    // watch: {
    //     name() {
    //         this.search = String(Date.now())
    //     },
    // },
    // methods: {
        function loadItems({ page, itemsPerPage, sortBy }) {
            loading = true
            const fetchitem:Fetchparam={
                page:page,
                itemsPerPage:itemsPerPage,
                sortBy:sortBy,
                search:search
            }
            FakeAPI.fetch(fetchitem).then(
                ({ data, total }) => {
                    this.serverItems = data
                    this.totalItems = total
                    this.loading = false
                })
        }
    // },
// }


</script>