// Raphael_MarketingModule.js

module.exports = {

    campaigns: [
        {
            id: 1,
            name: "Summer Sale",
            type: "Seasonal",
            discount: 20,
            active: true,
            createdDate: "1/1/2025",
            views: ["user999"]
        },
        {
            id: 2,
            name: "Flash Deal",
            type: "Limited",
            discount: 30,
            active: false,
            createdDate: "2/1/2025",
            endDate: "25/5/2025",
            views: ["user123"]
        },
        {
            id: 3,
            name: "Student Promo",
            type: "Education",
            discount: 10,
            active: true,
            createdDate: "3/1/2025",
            views: []
        },
        {
            id: 4,
            name: "Black Friday",
            type: "Mega",
            discount: 70,
            active: true,
            createdDate: "4/1/2025",
            views: ["user123", "user999"]
        }
    ],

    // ============================================================
    //Stores expired campaigns
    // ============================================================
    expiredCampaigns: [
        {
            id: 2,
            name: "Flash Deal",
            type: "Limited",
            discount: 30,
            active: false,
            createdDate: "2/1/2025",
            endDate: "25/5/2025",
            views: ["user123"]
        }
    ],

    // ============================================================
    //   Tracks used promotions with savings
    // ============================================================
    usedPromotions: [
        {
            userId: "user123",
            campaignName: "Flash Deal",
            savedAmount: 371.1,
            date: "5/20/2025"
        },
        {
            userId: "user123",
            campaignName: "Black Friday",
            savedAmount: 350,
            date: "5/20/2025"
        }
    ],










// ============================================================
// 1. Add a new campaign 
// ============================================================

//Adds a new marketing campaign object to the campaigns array.
//The campaign includes details such as name, type, discount, and creation date.
//If a custom date is not provided, today’s date will be used.
//Each new campaign is marked as active and starts with an empty views list.

 

addCampaign: function(name, type, discount, customDate) {
    const id = this.campaigns.length + 1; // Generate next campaign ID
    const createdDate = customDate || new Date().toLocaleDateString(); // Use custom or today's date

 
    this.campaigns.push({
        id: id,
        name: name,
        type: type,
        discount: discount,
        active: true,
        createdDate: createdDate,
        views: []
    });

    
    console.log(`Campaign '${name}' added successfully!`);
    console.log(`- Type: ${type}`);
    console.log(`- Discount: ${discount}%`);
    console.log(`- Created: ${createdDate}`);
    console.log();
},














// ============================================================
// 2. Apply discount to a purchase
// ============================================================


//Applies a discount to a given price based on the specified campaign name.
//If the campaign is active, calculates the discount and updates the user's used promotions.
//Returns an object showing the original price, discount amount, and final price after applying the promotion.

 
applyDiscount: function(price, campaignName, userId) {
    const campaign = this.campaigns.find(//name and campaign is the key of the value right the value is then put into c variable
        c => c.name === campaignName && c.active
    ); // Find active campaign by name



    if (campaign) {
        let discountPercent = campaign.discount; // Get discount percent
        let discountAmount = price * (discountPercent / 100); // Calculate discount
        let finalPrice = price - discountAmount; // Apply discount

        if (userId) {
            this.usedPromotions.push({
                userId: userId,
                campaignName: campaignName,
                savedAmount: discountAmount,
                date: new Date().toLocaleDateString() // Get today’s date
            });
        }

        const result = {
            originalPrice: price,
            discountPercent: discountPercent,
            discountAmount: discountAmount,
            finalPrice: finalPrice,
            savedAmount: discountAmount
        };

        console.log(`applyDiscount on $${price} using '${campaignName}':`);
        console.log(result);
        console.log();
        return result;
    }

    // If no valid campaign found
    const noDiscount = {
        originalPrice: price,
        finalPrice: price,
        message: "No active campaign applied"
    };
    console.log(`applyDiscount on $${price} using '${campaignName}':`);
    console.log(noDiscount);
    console.log();
    return noDiscount;
},














// ============================================================
// 3. Mark a campaign as expired
// ============================================================

 //Marks a specified campaign as expired by setting its status to inactive.
 // If successful, adds the campaign to the expiredCampaigns list and sets the end date.

expireCampaign: function(name, customEndDate) {
    const campaign = this.campaigns.find(c => c.name === name && c.active); // Find active campaign by name

    if (campaign) {
        campaign.active = false;
        campaign.endDate = customEndDate || new Date().toLocaleDateString(); // Set end date (use today's if not given)
        this.expiredCampaigns.push(campaign); 
        console.log(`Campaign '${name}' expired on ${campaign.endDate}.`);
           console.log(); //  for spacing
    } else {
        console.log(`Error: No active campaign found with the name '${name}'.`); 
    }
},








    // ============================================================
    // 4. Track a user's view of a campaign
    // ============================================================

    
 // Support function that records when a user views a specific campaign.
// It simulates a user viewing a campaign by adding their userId to the campaign’s 'views' array.
// This is important because other functions (like engagement rate calculations and campaign stats)
// rely on view data to provide meaningful insights. The more views you track, the more accurate
// your analytics (like usage/view ratios) will be.
 
trackView: function(campaignName, userId) {
    for (let i = 0; i < this.campaigns.length; i++) {
        if (this.campaigns[i].name === campaignName) {
            this.campaigns[i].views.push(userId);
            console.log(`User '${userId}' viewed campaign '${campaignName}'.`);
           console.log(`Viewers:`, this.campaigns[i].views);
console.log(); 
            return;
        }
    }
    console.log(`Campaign '${campaignName}' not found.\n`);
},











// ============================================================
// 5.Rank campaigns by engagement rate (usage/views)
// ============================================================

//Analytical function that calculates and ranks campaigns based on their engagement rate (usage/views).
//Outputs each campaign’s views, usage count, and engagement rate, then highlights the most effective one.


rankCampaignsByEngagementRate: function() {
    let result = []; // Store each campaign’s engagement data

    // Loop through each campaign to calculate views and usage
    this.campaigns.forEach(c => {
        let views = c.views.length;

        // Count how many times this campaign was used
        let usage = this.usedPromotions.filter(p => p.campaignName === c.name).length;
        //it counts how many times the current campaign (c.name) appears in the usedPromotions array

        let engagementRate = views > 0 ? usage / views : null;// If there are views, calculate rate; else set to null to avoid divide by 0

        result.push({
            name: c.name,
            views: views,
            usage: usage,
            engagementRate: engagementRate
        });
    });

    // Display engagement data
    console.log("rankCampaignsByEngagementRate:");
    result.forEach(r => {
        let rateText = r.engagementRate !== null ? r.engagementRate.toFixed(2) : "null"; // Format rate to 2 decimal places, or show 'N/A' if no views to avoid divide-by-zero

        console.log(`- ${r.name}: ${r.views} views, ${r.usage} usages, Engagement Rate: ${rateText}`);
    });

    // Find the most effective campaign based on engagement rate
    let best = null;// Store the campaign with highest engagement (starts as none)
    let bestRate = -1; // Initialize to -1 so any real engagement rate (0 or higher) will replace it

    result.forEach(r => {
        if (r.engagementRate !== null && r.engagementRate > bestRate) {
            bestRate = r.engagementRate;
            best = r;
        }
    });

    if (best) {
        console.log(`Most effective campaign: ${best.name} (Engagement Rate: ${bestRate.toFixed(2)})`);
    } else {
        console.log("No campaign had any views, so no engagement rate could be calculated.");
    }

    console.log();
    return result;
},


    // ============================================================
    // 6. View detailed campaign statistics
    // ============================================================
    getCampaignStats: function(name) {
        for (let i = 0; i < this.campaigns.length; i++) {
            if (this.campaigns[i].name === name) {
                const c = this.campaigns[i];
                console.log(`getCampaignStats for '${name}':`);
                console.log(`Name: ${c.name} (${c.type})`);
                console.log(`Discount: ${c.discount}%`);
                console.log(`Status: ${c.active ? "Active" : "Expired"}`);
                console.log(`Created: ${c.createdDate}`);
                if (c.endDate) console.log(`Ended: ${c.endDate}`);
                console.log(`Views: ${c.views.length}`);
                console.log(`Viewers: ${c.views}`);
                console.log();
                return c;
            }
        }
        console.log(`No campaign found with the name '${name}'.\n`);
        return null;
    },






    
// ============================================================
// 7. Get all promotions used by a user
// ============================================================

//Retrieves and displays all promotions used by a specific user, along with savings and usage dates.
//Calculates the total amount the user has saved across all promotions.

getUserUsedPromotions: function(userId) {
    // Filter promotions that match the given userId
    let result = this.usedPromotions.filter(p => p.userId === userId);

    // Calculate total savings from those promotions
    let totalSaved = 0;
    result.forEach(p => totalSaved += p.savedAmount);

    // Display results
    console.log(`getUserUsedPromotions for '${userId}':`);
    console.log("Promotions Used:");
    result.forEach(p => {
        console.log(`- ${p.campaignName} — Saved $${p.savedAmount.toFixed(2)} on ${p.date}`);
    });
    console.log("Total Saved: $" + totalSaved.toFixed(2));
    console.log();

    return {
        promotions: result,
        totalSaved: totalSaved
    };
},











    // ============================================================
    // 8. List all campaigns (summary view)
    // ============================================================
getAllCampaigns: function() {
    console.log("getAllCampaigns:");
    this.campaigns.forEach(c => {
        const status = c.active ? "Active" : "Expired";
        console.log(`- ${c.name} (${c.type}) — ${c.discount}% — ${status}`);
    });
    console.log();
    return this.campaigns;
},














// ============================================================
// 9. Get campaigns ending soon (within X days)
// ============================================================

// Retrieves a list of campaigns that are ending within a specified number of days
//Outputs the campaign name, end date, and how many days are left.


getEndingSoonCampaigns: function(daysleft) {
    let today = new Date(); // Get today’s current date (using built-in Date object)
    let result = []; // Store campaigns that are ending soon

    this.campaigns.forEach(c => { //loop all campaigns to check if their end date is within the next 'daysleft' days
        if (!c.endDate) return; // Skip if no end date

        let parts = c.endDate.split("/"); // Split "dd/mm/yyyy"
        let endDate = new Date(parts[2], parts[1] - 1, parts[0]); // Convert to new Date(year, month, day) because JS months start from 0 (Jan = 0, Dec = 11)

        let diffTime = endDate.getTime() - today.getTime(); // Get time difference in milliseconds
        //getTime() is a JavaScript built-in function that returns the number of milliseconds
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert time difference to full number of days

        if (diffDays >= 0 && diffDays <= daysleft) {// Check if campaign ends within the daysleft
            result.push({
                name: c.name,
                endDate: c.endDate,
                daysLeft: diffDays
            });
        }
    });

    console.log(`getEndingSoonCampaigns (within ${daysleft} days):`);
    if (result.length === 0) {
        console.log("No campaigns ending soon.");
    } else {
        result.forEach(c => {
            console.log(`- ${c.name} ends on ${c.endDate} (${c.daysLeft} days left)`);
        });
    }
    console.log();

    return result;
},













};