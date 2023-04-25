// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Election {

    string public name = "Election";
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    constructor(){
        addCandidate("Narendra Modi - BJP");
        addCandidate("Rahul Gandhi - Congress");
        addCandidate("Arvind Kejriwal - Aam Aadmi Party");
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId >= 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
}

// contract Election{
//     //Constructor - We initialize when this to first check everything is properly working.
//     //So just to check we will:-
//     //Store the candidate 
//     //Read the candidate
//     // Now we tell the constructor that we are writing a constructor by writing a function name same as the Contract
    
//     //string public candidate;//we have declared a variable of string type and we have declared it public.
//     //Now we have declared public we can easily read the candidate without any reader function.

//     //Now we will write the actual smart contract for our project.
//     //Model a candidate
//     struct Candidate{

//         uint id;
//         string name;
//         uint voteCount;
//         }


//     //Store a candidate
//     //Fetch Candidate
//     mapping(uint => Candidate) public candidates;
//     //Store candidates count
//     uint public candidatesCount;
    
// constructor() public{
//         addCandidate("Candidate 1");
//         addCandidate("Candidate 2");
//     }

//     function addCandidate (string memory _name) private {
//         candidatesCount ++;
//         candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);

//     }
    
    // function vote (uint _candidateId) public {
    //     // require that they haven't voted before
    //     require(!voters[msg.sender]);

    //     // require a valid candidate
    //     require(_candidateId > 0 && _candidateId <= candidatesCount);

    //     // record that voter has voted
    //     voters[msg.sender] = true;

    //     // update candidate vote Count
    //     candidates[_candidateId].voteCount ++;

    //     // trigger voted event
    //     votedEvent(_candidateId);
    // }
// }


