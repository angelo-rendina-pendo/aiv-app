Vue.component('vue-tabs', {
    name: 'VueTabs',
    template: `
    <div id="vue-tabs">
        <button v-for="(tab, index) in tabs" :key="index" @click="onClick(tab)">
            {{ tab }}
        </button>
    </div>`,
    computed: {
        tabs () {
            return ['angularA', 'angularB', 'vueA', 'vueB'];
        }
    },
    methods: {
        onClick(tab) {
            const path = `/${tab}`;
            if (this.$route.path !== path) {
                this.$router.push(path);
            }
        }
    }
});

const VueComponentA = {
    template: "<div>This is a Vue page! Foo is {{ foo }}</div>",
    computed: {
        foo() {
            return this.$store.getters["foo"];
        }
    }
};

const VueComponentB = {
    template: `
    <div>
        <div>This is another Vue page!</div>
        Some logic in a Vue page: <button @click="onClick">Foo is {{ foo }}</button>
    </div>`,
    computed: {
        foo() {
            return this.$store.getters["foo"];
        }
    },
    methods: {
        onClick() {
            this.$store.dispatch("increment");
        }
    }
};

const ngWrapper = {
    template: `<div v-pre id="ng-root"><div ng-view></div></div>`,
    mounted () {
        angular.bootstrap(this.$el, ["aivApp"]);
    }
};

const vueRouter = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/vueA",
            component: VueComponentA
        },
        {
            path: "/vueB",
            component: VueComponentB
        },
        {
            path: "/angularA",
            component: ngWrapper
        },
        {
            path: "/angularB",
            component: ngWrapper
        }
    ]
});
