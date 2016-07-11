<template>
  <span>
    <div class="header">Teams <small>listed by first appearance in a super bowl</small></div>
    <div>
      <div v-for="sb in superBowlTeams" v-on:click="chooseTeam(sb.name)" v-bind:class="sb.class">{{sb.name}}</div>
    </div>
</span>
</template>

<script>
import {sbData} from './sb-data';
import {uniq, flattenDeep} from 'lodash';
import mainVue from './emitter';

let superBowlTeamNames = [];
for (const sbName in sbData) {
  superBowlTeamNames.push(sbData[sbName].teams);
}
superBowlTeamNames = uniq(flattenDeep(superBowlTeamNames));

const superBowlTeams = superBowlTeamNames.map((team) => {
  return {
    name: team,
    class: 'clickable sb-titles',
  };
});


export default {
  data: () => {
    return {
      superBowlTeams,
    };
  },
  methods: {
    yearUpdated(year) {
      const yearObject = sbData[year];
      this.superBowlTeams.map((team) => {
        if(yearObject && (yearObject.teams[0] === team.name || yearObject.teams[1] === team.name)) {
          team.class = 'clickable chosen sb-titles';
        } else {
          team.class = 'clickable sb-titles';
        }
      });
    },
    chooseTeam(team) {
      let chosenTeam = team;
      if (this.previouslyChosenTeam === chosenTeam) {
        chosenTeam = undefined;
      }
      this.superBowlTeams.map((mapTeam) => {
        if(mapTeam.name === chosenTeam) {
          mapTeam.class = 'clickable chosen sb-titles';
        } else {
          mapTeam.class = 'clickable sb-titles';
        }
      });
      this.previouslyChosenTeam = chosenTeam;
      mainVue.$emit('team-chosen', chosenTeam);
    },
  },
};
</script>