require 'spec_helper'

feature 'sign up', %Q{
  As an unauthenticated user
  I want to sign up
  So that I can view my saved scores
} do
  scenario 'specifying valid and required information' do
    visit root_path
    click_link 'Sign Up'
    fill_in 'Name', with: 'Jon Smith'
    fill_in 'Email', with: 'user@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password Confirmation', with: 'password'
    click_button 'Sign Up'
    expect(page).to have_content("You're in!")
    expect(page).to have_content('Sign Out')
  end
  
  scenario 'required information is not supplied'
  
  scenario 'password confirmation does not match confirmation'
end