import React, { Component } from 'react';
import { Link } from "../routes";
import { getAllCampaigns } from "../redux/actions/campaignAction";
import Campaign from "../Ethereum/campaign";
import CampaignCard from "../components/campaign/CampaignCard";
import Styles from "../styles/_index";

class explore extends Component {


    static async getInitialProps(ctx) {
        try {
            let campaigns = await ctx.store.dispatch(getAllCampaigns());
            if (campaigns) {
                let campaignsSummary = await Promise.all(campaigns.map(async singleCampaign => {
                    let campaign = Campaign(singleCampaign.campaignAddress);
                    return campaign.methods.getSummary().call()
                }));
                return {
                    campaigns,
                    campaignsSummary
                }
            }

        } catch (err) {
            console.log(err);
        }
    }

    renderCampaignCards = () => {
        return this.props.campaigns.map((campaign, index) => {
            let campaignRoute = `/campaign/${campaign.campaignAddress}`;
            return (
                <Link route={campaignRoute} key={index}>

                    <Styles.CampaignCardStyle>
                        <CampaignCard

                            campaign={campaign}
                            campaignSummary={this.props.campaignsSummary[index]}
                        />

                    </Styles.CampaignCardStyle>

                </Link>
            );
        });
    };




    render() {
        return (
            <Styles.ExploreContainerStyle>
                {this.renderCampaignCards()}
            </Styles.ExploreContainerStyle>
        )
    }
}


export default explore;