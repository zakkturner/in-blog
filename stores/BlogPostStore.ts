import { defineStore } from 'pinia';
import axios from "axios";
import {useRuntimeConfig} from "#app";


export const useBlogStore = defineStore("blog", {
    state() {
        return {
            blogPosts: [],
            selectedBlog:undefined,
            currentSort: 'created_at',
            currentSortDir: 'desc',
            //Pagination state
            pageSize: 10,
            currentPage: 1,
            //searchState
            // enteredSearchQuery: false


        };
    },
    getters: {
        getBlogPosts: (state) => state.blogPosts,
        // getSelectedBlog: (state) => state.selectedBlog,
        // getSortedBlog: (state) =>{
        //     return state.blog.sort((a,b) =>{
        //         let modifier = 1;
        //         if(state.currentSortDir === 'desc') modifier = -1;
        //         if(a[state.currentSort] < b [state.currentSort]) return -1 * modifier;
        //         if(a[state.currentSort] > b[state.currentSort]) return 1 * modifier;
        //         return 0;
        //
        //     }).filter((row, index) => {
        //         let start = (state.currentPage-1)*state.pageSize;
        //         let end = state.currentPage*state.pageSize;
        //         if(index >= start && index < end) return true;
        //     });
        // },
        // getPageAmount: (state) => Math.round(state.blog.length / state.pageSize),
        // getCurrentPage: (state) => state.currentPage,
        // getIfEnteredSearchQuery:(state) => state.enteredSearchQuery
    },
    actions: {
        async fetchBlogPosts() {

            try {

                const response = await axios.get(
                    `${useRuntimeConfig().public.BASE_URL}/api/posts`
                );
                this.blogPosts = response.data;

            } catch (error) {
                // alert(error);
                console.log(error);
            }
        },
        // async fetchBlog(searchQuery){
        //     try {
        //         const data = await axios.get(`/api/blog/filter/?search=${searchQuery}`);
        //         this.blog = data.data
        //     }
        //     catch (error) {
        //         alert(error)
        //         console.log(error)
        //     }
        // },
        selectBlog(project: any){
            this.selectedBlog = project
        },
        // sort: function(s: any){
        //     if(s ===  this.currentSort){
        //         this.currentSortDir = this.currentSortDir==='asc'?'desc' : 'asc';
        //     }
        //     this.currentSort = s;
        // },
        // nextPage:function() {
        //     if((this.currentPage*this.pageSize) < this.blog.length) this.currentPage++
        // },
        // prevPage: function(){
        //     if(this.currentPage > 1) this.currentPage--;
        // },
        // jumpToPage: function(newPageNum: any){
        //     this.currentPage = newPageNum
        // }

    },
});
