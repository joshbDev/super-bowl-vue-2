import Vue from 'vue/dist/vue';
const bus = new Vue();
import yearsDisplay from './years-display.vue';
import teamDisplay from './teams-display.vue';

bus.$on('team-updated', (team) => {
  yearsDisplay.methods.teamUpdated(team);
});
bus.$on('year-updated', (year) => {
  teamDisplay.methods.yearUpdated.call(teamDisplay.data(), year);
});

export default bus;
