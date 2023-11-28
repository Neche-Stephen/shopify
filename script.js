// Code for profile menu display starts here
function triggerProfileMenu(){
    // Get menu trigger
    const menuTrigger = document.getElementById('store_nav_details');
    //get menu
    const menu = document.getElementById("profile_menu_items");
    // Get all menus items
    const allMenuItems = menu.querySelectorAll('[role = "menuitem"]');

    function closeMenu(){
        //Set aria-expanded property of menuTrigger element to "true" for screen readers
        menuTrigger.ariaExpanded = "false";
        menuTrigger.focus();
    }

    function handleMenuEscapeKeypress(event){
        //If user presses escape key
        if (event.key === "Escape"){
            toggleMenu();
        }
    }

    function handleMenuItemArrowKeyPress(event, menuItemIndex){

        const isLastMenuItem = menuItemIndex === allMenuItems.length - 1;
        const isFirstMenuItem = menuItemIndex === 0;

        const nextMenuItem = allMenuItems.item(menuItemIndex + 1);
        const prevMenuItem = allMenuItems.item(menuItemIndex - 1);

        // if the user pressed arrow right or arrow down
        if (event.key === 'ArrowRight' || event.key === "ArrowDown"){
             // if user is on last item, focus on first menuitem
             if (isLastMenuItem){
                allMenuItems.item(0).focus();
                return;
             }
             // then focus on next menu item
             nextMenuItem.focus();

        }


         // if the user pressed arrow left or arrow up
        if (event.key === 'ArrowLeft' || event.key === "ArrowUp"){
            // if  the user is on the first menu item, focus on last menuitem
             if (isFirstMenuItem){
                allMenuItems.item(allMenuItems.length - 1).focus();
                return;
             }
             // then focus on the previous menu item
             prevMenuItem.focus();

        }


       

    }

    function openMenu(){
        menuTrigger.ariaExpanded = "true";
        allMenuItems.item(0).focus();
        menu.addEventListener('keyup', handleMenuEscapeKeypress)

        // for each menu item, register an event listener for the keyup event
        allMenuItems.forEach(function (menuItem, menuItemIndex){
            menuItem.addEventListener('keyup', function(event){
                handleMenuItemArrowKeyPress(event, menuItemIndex);
            })
        })

    }

    function toggleMenu(){
        // Extracted value of "aria-expanded" attribute for menuTrigger
        const isExpanded = menuTrigger.attributes['aria-expanded'].value === "true";
        
        // add "menu_items_active" class to menu
        menu.classList.toggle('menu_items_active');

        if(isExpanded){
            closeMenu()
        } else{
            openMenu();
        }

    }

    //Add event listener to menu trigger, and call toggleMenu function when the "click" event happens
    menuTrigger.addEventListener('click', toggleMenu);

}
triggerProfileMenu();

// Code for notification icon menu display starts here
function triggerNotification(){
    // Get Notification Trigger
    const notificationTrigger = document.getElementById('notification_bell')
    //get Notification menu
    const notificationMenu = document.getElementById("notification_menu");

    function closeNotificationMenu (){
         //Set aria-expanded property of menuTrigger element to "true" for screen readers
         notificationTrigger.ariaExpanded = "false";
         notificationTrigger.focus();
    }

    function handleNotificationMenuEscapeKeypress (event){
           //If user presses escape key
        if (event.key === "Escape"){
            toggleNotification();
        }
    }

    function openNotificationMenu (){
        notificationTrigger.ariaExpanded = "true";
        // notificationMenu.focus();
        // const checkBtn = document.getElementById('check');
        // checkBtn.focus();
        // notificationMenu.addEventListener('keyup', handleNotificationMenuEscapeKeypress);

    }

    function toggleNotification(){
        // Extracted value of "aria-expanded" attribute for notificationTrigger
        const isNotificationMenuExpanded = notificationTrigger.attributes['aria-expanded'].value === "true";
        
        // add "notification_list_active" class to notificationMenu
        notificationMenu.classList.toggle('notification_list_active');

        if(isNotificationMenuExpanded){
            closeNotificationMenu()
        } else{
            openNotificationMenu();
        }
    }

    //Add event listener to notifcation trigger
    notificationTrigger.addEventListener('click', toggleNotification);
}
triggerNotification();

function dismissTrialCallout (){  
    // Get trial callout div
    const trialCallout =  document.getElementById('trial_callout');

    // Get trial callout div dismiss button
    const trialCalloutDismiss =  document.getElementById('trial_callout_dismiss');

    // Add event listener to trial callout div
    trialCalloutDismiss.addEventListener('click', function(){
        trialCallout.classList.toggle('select_plan_dismiss')
    })
}
dismissTrialCallout();

function toggleSetupguide(){
    // Get the steps container
    const stepsContainer = document.getElementById('step_container');
    //Get the arrow up icon
    const arrowUp = document.getElementById('setup_uparrow');
     //Get the arrow down icon
    const arrowDown = document.getElementById('setup_downarrow');
    // Add event listener to the arrow up icon

    arrowUp.addEventListener('click', function(){
        arrowUp.style.display = 'none';
        arrowDown.style.display = 'block';
        stepsContainer.classList.toggle('step_container_close')
    })

    arrowDown.addEventListener('click', function(){
        arrowDown.style.display = 'none';
        arrowUp.style.display = 'block';
        stepsContainer.classList.toggle('step_container_close')
    })
}
toggleSetupguide();

// Function to toggle steps and check step checkboxes
function toggleSteps(){
    // Code for toggling steps/step content starts here

    // Function to toggle steps and display steps content
    function displayContent(stepNumber){
        let content = document.getElementById('content' + stepNumber);
        let selectedStep = document.querySelector('.step:nth-child(' + stepNumber + ')');

        // Check if the clicked content is already open
        if (content.style.display === 'block') {
            return; // Do nothing if the content is already open
        }
      
        // Hide all other contents before displaying the selected one
        let contents = document.querySelectorAll('.step_content');
        contents.forEach(function(stepContent) {
            stepContent.style.display = 'none';
        });
      
        // Hide all step images before displaying the selected one
        let stepImages = document.querySelectorAll('.step_image');
        stepImages.forEach(function(image) {
            image.style.display = 'none';
        });
      
        // Display the clicked content
        content.style.display = 'block';
      
        // Display the image for the clicked step
        let selectedStepImage = selectedStep.querySelector('.step_image');
        // selectedStepImage.style.display = 'block';
        selectedStepImage.classList.toggle('.step_image_active')
      
        // Remove active class from all items
        let allSteps = document.querySelectorAll('.step');
        allSteps.forEach(function(step) {
            step.classList.remove('step_active');
        });
      
        // Add active class to the clicked item
        selectedStep.classList.add('step_active');
    }
    // Get all steps
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index)=>{
        step.addEventListener('click', (event)=>{
        displayContent(index + 1)
        })
    })

    // Code for toggling step checkboxes starts here

     // Initialize the count of checked checkboxes
     let checkedCount = 0;
     const checkboxBtn = document.querySelector('.step_checkbox');
     const checkboxes = document.querySelectorAll('.step_checkbox');
     const progressBar = document.querySelector('.progress_bar');
     const progressText = document.querySelector('.progress_bar_number');
     const checkboxButtonStatus = document.querySelector('#shopping-item-checkbox-status');   

     function toggleCheckboxToChecked(checkedSVG, uncheckedSVG, transitionSVG, index){
        uncheckedSVG.style.display = 'none';
        transitionSVG.style.display = 'block';

        checkboxButtonStatus.ariaLabel = 'Loading. Please wait...';

        // Time out to mock a transition period
        setTimeout(()=>{
            transitionSVG.style.display = 'none';
            checkedSVG.style.display = 'block';
            checkboxBtn.ariaLabel = checkboxBtn.ariaLabel.replace('as done', 'as not done');
            checkboxButtonStatus.ariaLabel = 'Successfully marked step guide as done'
        }, 2000);

        // Time out to ensure count and progress bar is updated after transition period
        setTimeout(()=>{
            checkedCount++;
            updateProgressBar(checkedCount);
             // Loop through each 'step' element so the next unchecked step can be displayed
            for (let i = index; i < steps.length; i++) {
                const step = steps[i];
                
                // Find the button inside each 'step' element
                const button = step.querySelector('.step_checkbox');
                
                // Check if the button has data-checked="false"
                if (button && button.getAttribute('data-checked') === 'false') {
                console.log(`Button with data-checked="false" found in step ${i + 1}`);
                // Perform actions or store information about the specific step here
                displayContent(i + 1);
                return
                }
            }
        }, 2000)
       
     }

     function toggleCheckboxToUnChecked(checkedSVG, uncheckedSVG, transitionSVG){
        checkedSVG.style.display = 'none';
        transitionSVG.style.display = 'block';

        checkboxButtonStatus.ariaLabel = 'Loading. Please wait...';

        setTimeout(()=>{
            transitionSVG.style.display = 'none';
            uncheckedSVG.style.display = 'block';
            checkboxBtn.ariaLabel = checkboxBtn.ariaLabel.replace('as not done', 'as done');
            checkboxButtonStatus.ariaLabel = 'Successfully marked step guide as not done';
            }, 2000);
    
        checkedCount--;
     }
    
    checkboxes.forEach((checkbox, index) => {
        checkbox.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevents the click event from bubbling up to the parent div
            const isChecked = this.getAttribute('data-checked') === 'true';
            this.setAttribute('data-checked', !isChecked);
            const checkedSVG = this.querySelector('#step_checkbox_checked');
            const uncheckedSVG = this.querySelector('#step_checkbox_unchecked');
            const transitionSVG = this.querySelector('#step_checkbox_transition');
    
            if (isChecked) {
                toggleCheckboxToUnChecked(checkedSVG, uncheckedSVG, transitionSVG)
            } else {
                toggleCheckboxToChecked(checkedSVG, uncheckedSVG, transitionSVG, index);
            }
    
            updateProgressBar(checkedCount);
        });

        // Check initial state and count checked checkboxes
        if (checkbox.getAttribute('data-checked') === 'true') {
            checkedCount++;
        }
    });

    // Set initial progress text content
    progressText.textContent = `${checkedCount} / ${checkboxes.length} completed`;

    function updateProgressBar(checkedCount) {
        const total = checkboxes.length;
        const progressPercentage = (checkedCount / total) * 100;
        progressBar.style.width = progressPercentage + '%';
        progressText.textContent = `${checkedCount} / ${total} completed`;
    }

}
toggleSteps()
