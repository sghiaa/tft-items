import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Footer from '../Footer/Footer';
import './TeamComps.css';
import { useSelectedSet } from '../../setSelection';
import { Champion, loadChampionsForSet, Tag } from '../../championData';

type Frequencies = Map<Tag, number>

const findChampionsWithMostSharedTags = (allChampions: Champion[], teamChampions: Champion[]): Champion[] => {
  const tagFrequencies: Frequencies = new Map();
  
  // Calculate the frequency of each tag among the existing team members
  for (const teamMember of teamChampions) {
    const uniqueTags = new Set(teamMember.tags);
    for (const tag of uniqueTags) {
      if (tagFrequencies.has(tag)) {
        tagFrequencies.set(tag, tagFrequencies.get(tag)! + 1);
      } else {
        tagFrequencies.set(tag, 1);
      }
    }
  }

  // Calculate the number of team members that share each tag
  const teamTagFrequencies: Frequencies = new Map();
  for (const teamMember of teamChampions) {
    for (const tag of teamMember.tags) {
      if (teamTagFrequencies.has(tag)) {
        teamTagFrequencies.set(tag, teamTagFrequencies.get(tag)! + 1);
      } else {
        teamTagFrequencies.set(tag, 1);
      }
    }
  }
  
  // Sort all champions by the number of shared tags with the existing team members
  const sortedChampions = allChampions.slice().sort((a, b) => {
    let aSharedTags = 0;
    let bSharedTags = 0;
    for (const tag of a.tags) {
      if (tagFrequencies.has(tag)) {
        aSharedTags += tagFrequencies.get(tag)! * (teamTagFrequencies.get(tag) || 1);
      }
    }
    for (const tag of b.tags) {
      if (tagFrequencies.has(tag)) {
        bSharedTags += tagFrequencies.get(tag)! * (teamTagFrequencies.get(tag) || 1);
      }
    }
    return bSharedTags - aSharedTags;
  });
  
  // Filter out any champions that are already in the teamChampions array or have zero shared tags with the team
  const filteredChampions = sortedChampions.filter(champion => !teamChampions.includes(champion) && champion.tags.some(tag => tagFrequencies.has(tag)));
  
  // Return the top 5 champions with the most shared tags
  return filteredChampions.slice(0, 5);
}

const TeamComps = () => {
  const { selectedSet } = useSelectedSet();
  const [ data, setData ] = useState<Array<Champion>>();
  const load = useCallback(() => {
    loadChampionsForSet(selectedSet).then((champions) => setData(champions));
  }, [selectedSet]);

  useEffect(() => {
    load();
  }, [load]);
  
  const [champions, setChampions] = useState<Array<Champion>>([]);
  const [frequencies, setFrequencies] = useState<Frequencies>();
  const [targets, setTargets] = useState<Array<Champion>>();
  const addChampion = (champ: Champion) => {
    setChampions([champ, ...champions]);
  }
  const removeChampion = (index: number) => {
    let temp = [...champions];
    temp.splice(index, 1)
    setChampions(temp);
  }
  useEffect(() => {
    const tagFrequencies: Frequencies = new Map();
    const uniqueTeamChampions = Array.from(new Set(champions.map(champion => champion.name))).map(name => champions.find(champion => champion.name === name)!);
  
    // Calculate the frequency of each tag among the existing team members
    for (const teamMember of uniqueTeamChampions) {
      for (const tag of teamMember.tags) {
        if (tagFrequencies.has(tag)) {
          tagFrequencies.set(tag, tagFrequencies.get(tag)! + 1);
        } else {
          tagFrequencies.set(tag, 1);
        }
      }
    }
    setFrequencies(tagFrequencies);
  }, [champions])

  useEffect(() => {
    if(data) {
      let t = findChampionsWithMostSharedTags(data, champions);
      setTargets(t)
    }
  }, [data, champions])

  useEffect(() => {
    setChampions([]);
    setFrequencies(undefined);
    setTargets(undefined);
  }, [selectedSet]);

  const sortedFrequencies = frequencies
    ? Array.from(frequencies.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    : [];

  return (
    <div className="appPage">
      <div className="pageIntro">
        <div className="pageEyebrow">Team Builder</div>
        <h1 className="pageTitle">Find the next unit for your board</h1>
        <p className="pageDescription">Add the champions you already have and this tool highlights the units that share the most tags with your current team.</p>
      </div>
      <Container className="teamCompPage">
        <Row className="teamSelection appCard appCard--accent">
          <h2 className="panelTitle">Who is on your team?</h2>
          <p className="panelDescription">Tap champions to add them to your board. Tap them again in your team list to remove them.</p>
          <Row className="championSelection">
            {data && data.map((i, index) => {
              return (
                <Col xs={6} md={4} lg={3} key={index}>
                  <button className="championSelection-button" onClick={() => addChampion(i)}>{i.name}</button>
                </Col>
              )
            })}
          </Row>
          <Row className="team">
            <div className="team-title">
              <h3 className="panelTitle">Current team</h3>
            </div>
            {champions.map((i, index) => {
              return (
                <Col xs={6} md={4} lg={3} key={index}>
                  <button className="team-button" onClick={() => removeChampion(index)}>{i.name}</button>
                </Col>
              )
            })}
          </Row>
        </Row>
        <Row className="suggestedChampions appCard">
          <div className="suggestedChampions-content">
            <h2 className="panelTitle">Suggested Champions</h2>
            <p className="panelDescription">These picks overlap with the tags already on your board.</p>
            {targets && frequencies && targets.map(champion => {
              const matchingTags = champion.tags.filter(tag => frequencies.has(tag));
              const matchingTagsString = matchingTags.join(", ");
              return <p key={champion.name}>{champion.name}: {matchingTagsString}</p>;
            })}
          </div>
        </Row>
        <Row className="currentTeamTags appCard">
          <div className="currentTeamTags-title">
            <h2 className="panelTitle">Current team tags</h2>
            <p className="panelDescription">Use the frequency board to see which traits you are already leaning into.</p>
          </div>
          {frequencies && 
              <Row className="currentTeamTags-tags">
                {sortedFrequencies.map(([tag, count]) => (
                  <Col xs={6} md={4} lg={3} key={tag} className="currentTeamTags-tag">
                    {tag.replace(/_/g, ' ')}: {count}
                  </Col>
                ))}
              </Row>
          }
        </Row>
      </Container>
      <div>
        <Footer page="team-comps" />
      </div>
    </div>
  );
}

export default TeamComps;
