import { AbstractApiService } from "./AbstractApiService";
import type { CardBase } from "@/models";
//  read from json file

class OutputApiService extends AbstractApiService {
    constructor() {
        super("/v1/parsed_outputs");
    }

    outputs() {
        return [
            {
                "question": "What is the goal of the IT organization?",
                "answer": "The goal of the IT organization is to develop a new version of The Software (TS), which is an ongoing project for more than 5 years, and to convince car shops to use the new version of TS."
            },
            {
                "question": "What is the work culture in the IT organization?",
                "answer": "The work culture in the IT organization is flat hierachy (but still somewhat hierachic) with many meetings, discussions, and high flexibility of dev-teams expected. There are multiple teams and sub-teams, and responsibilities are split among divisions, committees, etc."
            },
            {
                "question": "What are some negative impacts of management on the IT organization?",
                "answer": "Some negative impacts of management on the IT organization include success being measured in budgets and amount of finished features, no customer evaluations or follow-up on features after introduction, aversion to reduction of technical debt, no refactorings or version increments, communication problems with dev teams/technical experts, no migration from outdated tools, and volatile planning."
            }
        ]


        //     return this.http
        //         .get("")
        //         .then(this.handleResponse.bind(this))
        //         .catch(this.handleError.bind(this));
        // }
    }
}

export const outputApiService = new OutputApiService();